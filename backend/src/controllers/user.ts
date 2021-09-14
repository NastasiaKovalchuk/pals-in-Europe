import mongoose from "mongoose";
import { RequestHandler } from "express";
import userModel, { User } from "../db/models/user.model";
import masterModel, { Master } from "../db/models/master.model";
import OrderModel, { Order } from "../db/models/order.model";
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, name, login, password } = req.body as {
      email: string;
      name: string;
      login: string;
      password: string;
    };
    const checkExistingEmail = await userModel.findOne({ email });
    if (!checkExistingEmail) {
      const checkExistingNick = await userModel.findOne({ name });
      if (!checkExistingNick) {
        const newUser = await new userModel({ email, name, login, password });
        newUser.save();
        if (newUser) {
          if (req.session) {
            req.session.user = {
              name: newUser.name,
              id: newUser._id,
            }
            return res.status(200).json({
              name: req.session.user.name,
              id: req.session.user.id,
              role: 'user',
            });
          }
        }
        return res
          .status(500)
          .json({ message: "Something went wrong" });
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
          }
          return res.status(200).json({
            name: req.session.user.name,
            id: req.session.user.id,
            role: 'user',
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
    const userAccount = await userModel.findOne({ _id: req?.session?.user?.id });
    res.status(200).json({ userAccount });
  } catch (error) {
    console.log(error);
  }
};


export const editUserProfile: RequestHandler = async (req, res) => {
  try {
    console.log('Зашли в ручку editUserProfile');
    const {
      name,
      login,
      email,
    } = req.body as {
      name: string,
      login: string,
      email: string,
    };
    //@ts-ignore
    const uptdaterUser = await userModel.findByIdAndUpdate({ _id: req?.session?.user?.id }, {
      name,
      login,
      email,
    }, { new: true })
    return res.status(200).json({
      uptdaterUser
    });
  } catch (error) {
    console.log(error);
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    // console.log('Зашли в ручку editUserProfile');
    const {
      name,
      comment,
      date,
      service,
      id
    } = req.body as {
      name: string, comment: string, date: string, service: string, id: string
    };
    //@ts-ignore
    const master = await masterModel.findById(id);
    const user = await userModel.findById(req?.session?.user?.id);
    const orders = await OrderModel.find();
    const lastNumOrder = orders[orders.length - 1].number;
    // console.log();
    
    // const numOrder = 
    const newOrder = await OrderModel.create({
      number: lastNumOrder + 1,
      author: user,
      master: master,
      comment,
      date,
      service
    })
    // console.log(newOrder);
    return res.status(200).json({
      newOrder
    });
  } catch (error) {
    console.log(error);
  }
};

