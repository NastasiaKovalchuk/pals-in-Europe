import mongoose from "mongoose";
import { mailer } from "./mailer";
import { RequestHandler } from "express";
import userModel, { User } from "../db/models/user.model";
import masterModel, { Master } from "../db/models/master.model";
import OrderModel, { Order } from "../db/models/order.model";
import ReviewModel, { Review } from "../db/models/review.model";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, name, login, password } = req.body as {
      email: string;
      name: string;
      login: string;
      password: string;
    };
    //@ts-ignore
    // const { picture } = req.file ? req.file.path : "";

    const checkExistingEmail = await userModel.findOne({ email });
    if (!checkExistingEmail) {
      const checkExistingNick = await userModel.findOne({ name });
      if (!checkExistingNick) {
        //@ts-ignore
        console.log("reqfile", req.file);
        //@ts-ignore
        const newUser = await new userModel({
          email,
          name,
          login,
          password,
          //@ts-ignore
          picture: req.file ? `/uploads/${req.file.filename}` : "",
        });

        newUser.save();
        const message = {
          to: email,
          subject: "You have successfully registered!",
          html: `
              <h2>Congratulations on your successful registration as User!</h2>
              <div>Your account details:</div>
              <ul>
              <li><strong>Login: </strong>${login},</li>
              <li><strong>Password: </strong>${password}.</li>
              </ul>
              We wish you success!`,
        };
        mailer(message);
        if (newUser) {
          if (req.session) {
            req.session.user = {
              name: newUser.name,
              id: newUser._id,
            };
            return res.status(200).json({

              newUser
              // name: req.session.user.name,
              // id: req.session.user.id,
              // role: "user",
            });
          }
        }
        return res.status(500).json({ message: "Something went wrong" });
      }
      return res.status(500).json({ message: "This nick already exists" });
    }
    return res.status(500).json({ message: "This email already exists" });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { login, password } = req.body as {
      login: string;
      password: string;
    };
    const checkUser = await userModel.findOne({ login });
    if (checkUser) {
      if (checkUser.password === password) {
        if (req.session) {
          req.session.user = {
            name: checkUser.name,
            id: checkUser._id,
          };
          return res.status(200).json({
            name: req.session.user.name,
            id: req.session.user.id,
            role: "user",
          });
        }
      }
    }
    return res
      .status(500)
      .json({ success: false, message: "Wrong email or password" });
  } catch (error) {
    console.log(error);
  }
};

export const getAccountUser: RequestHandler = async (req, res) => {
  try {
    const userAccount = await userModel.findOne({
      _id: req?.session?.user?.id,
    });
    res.status(200).json({ userAccount });
  } catch (error) {
    console.log(error);
  }
};

export const editUserProfile: RequestHandler = async (req, res) => {
  try {
    const { name, login, email } = req.body as {
      name: string;
      login: string;
      email: string;
    };
    //@ts-ignore
    const uptdaterUser = await userModel.findByIdAndUpdate(
      { _id: req?.session?.user?.id },
      {
        name,
        login,
        email,
      },
      { new: true }
    );
    return res.status(200).json({
      uptdaterUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { userID, comment, date, time, service, masterID } = req.body as {
      userID: string;
      comment: string;
      date: string;
      time: string;
      service: string;
      masterID: string;
    };
    const master = await masterModel.findById(masterID);
    const user = await userModel.findById(userID);
    // console.log(user.email);
    
    const orders = await OrderModel.find();
    if (orders.length > 0) {
      const newOrder = await OrderModel.create({
        name: user?.name,
        client: user,
        master: master,
        comment,
        date,
        time,
        service,
      });
      const message = {
        to: newOrder.client.email,
        subject: "Your application is accepted!!",
        html: `
            <h2>Congratulations on your successful application!</h2>
            <div>Your application details:</div>
            <ul>
            <li><strong>Your master: </strong>${master?.name}, ${newOrder.master.email}.</li>
            <li><strong>Date: </strong>${newOrder.date}.</li>
            <li><strong>Service: </strong>${newOrder.service}.</li>
            <li><strong>Comment: </strong>${newOrder.comment}.</li>
            </ul>
            We wish you success!`,
      };
      mailer(message);
      return res.status(200).json({
        message: "success",
      });
    } else {
      const newOrder = await OrderModel.create({
        name: user?.name,
        client: user,
        master: master,
        comment,
        date,
        time,
        service,
      });
      return res.status(200).json({
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createReview: RequestHandler = async (req, res) => {
  try {
    const { userID, newReview, masterID } = req.body as {
      userID: string;
      newReview: string;
      masterID: string;
    };
    const master = await masterModel.findById(masterID);
    const user = await userModel.findById(userID);
    const newReviewModel = await ReviewModel.create({
      text: newReview,
      author: user,
      master: master,
    });
    master?.reviews.push(newReviewModel);
    await master?.save();

    return res.status(200).json(newReviewModel);
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrder: RequestHandler = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    const userOrders = orders.filter((order: Order) => {
      if (order?.client?._id == req?.session?.user?.id) {
        return order;
      }
    });
    res.status(200).json({ userOrders });
  } catch (error) {
    console.log(error);
  }
};

export const getUserReviews: RequestHandler = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    const userReviews = reviews.filter((review: Review) => {
      //@ts-ignore
      if (review?.author?._id == req?.session?.user?.id) {
        return review;
      }
    });
    res.status(200).json({ userReviews });
  } catch (error) {
    console.log(error);
  }
};


export const changeStatusOrder: RequestHandler = async (req, res) => {
  try {
    const { id, status } = req.body as {
      id: string;
      status: string;
    };
    await OrderModel.findByIdAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    const orders = await OrderModel.find();
    const userOrders = orders.filter((order: Order) => {
      if (order?.client?._id == req?.session?.user?.id) {
        return order;
      }
    });
    res.status(200).json({message: 'success'});
  } catch (error) {
    console.log(error);
  }
};
