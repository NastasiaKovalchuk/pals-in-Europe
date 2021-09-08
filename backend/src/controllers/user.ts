import mongoose from "mongoose";
import { RequestHandler } from "express";
import userModel, { User } from "../db/models/user.model";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, name, login, password } = req.body as {
      email: string;
      name: string;
      login: string;
      password: string;
    };
    // console.log(email, name, login, password);
    
    const checkExistingEmail = await userModel.findOne({ email });
    if (!checkExistingEmail) {
      
      const checkExistingNick = await userModel.findOne({ username: name });
      if (!checkExistingNick) {
        const newUser = await new userModel({ email, username: name, login, password });
        
        newUser.save();
        if (newUser) {
          req.session.name = newUser.username;
          // req.session.id = newUser._id;
          return res.status(200).json({
            name: req.session.name,
            userId: newUser._id,
          });
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
      // console.log('checkUser =>', checkUser);
      if (checkUser.password === password) {
        req.session.name = checkUser.username;
        // req.session.id = checkUser._id;
        return res.status(200).json({
          success: true,
          name: req.session.name,
          userID: checkUser._id,
        });
      }
    }
    return res
      .status(500)
      .json({ success: false, message: "Wrong email or password" });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser: RequestHandler = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      console.log(err);
    });
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const checkUser: RequestHandler = (req, res, next) => {
  res.send({ name: req.session.name});
};
