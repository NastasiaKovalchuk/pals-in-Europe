import mongoose from "mongoose";
import { RequestHandler } from "express";
import userModel, { User } from "../db/models/user.model";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
      const { email, username, password } = req.body as {
        email: string;
        username: string;
        password: string;
      };
      const checkExistingEmail = await userModel.findOne({ email });
      if (!checkExistingEmail) {
        const checkExistingNick = await userModel.findOne({ username });
        if (!checkExistingNick) {
          const newUser = await new userModel({ email, username, password });
          newUser.save();
          if (newUser) {
            req.session.name = newUser.username;
            req.session.id = newUser._id;
            return res.status(200).json({ userID: req.session.id });
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
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const checkUser = await userModel.findOne({ email });
      if (checkUser) {
        if (checkUser.password === password) {
          req.session.name = checkUser.username;
          req.session.id = checkUser._id;
          return res.status(200).json({
            success: true,
            username: req.session.name,
            userID: req.session.id,
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
  res.send({ username: req.session.name, userID: req.session.id });
};
