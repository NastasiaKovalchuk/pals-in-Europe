import mongoose from "mongoose";
import { RequestHandler } from "express";
import userModel, { User } from "../db/models/user.model";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
      const { email, nick, password } = req.body as {
        email: string;
        nick: string;
        password: string;
      };
      const checkExistingEmail = await userModel.findOne({ email });
      if (!checkExistingEmail) {
        const checkExistingNick = await userModel.findOne({ nick });
        if (!checkExistingNick) {
          const newUser = await new userModel({ email, nick, password });
          newUser.save();
          if (newUser) {
            req.session.username = newUser.nick;
            req.session.userId = newUser._id;
            return res.status(200).json({ userID: req.session.userId });
          }
          return res
            .status(500)
            .json({ message: "Something went wrong" });
        }
        return res.status(500).json({ message: "This nick already exists" });
      }
      return res.status(500).json({ message: "This email already exists" });
  } catch (err: any) {
    throw new Error(err);
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
          req.session.username = checkUser.nick;
          req.session.userId = checkUser._id;
          return res.status(200).json({
            success: true,
            username: req.session.username,
            userID: req.session.userId,
          });
        }
      }
      return res
        .status(500)
        .json({ success: false, message: "Wrong email or password" });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logoutUser: RequestHandler = (req, res, next) => {
  try {
      req.session.destroy((err) => {
        console.log(err);
      });
      return res.status(200).send({ success: true });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const checkUser: RequestHandler = (req, res, next) => {
  res.send({ username: req.session.username, userID: req.session.userId });
};
