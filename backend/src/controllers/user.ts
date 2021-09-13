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
    const checkExistingEmail = await userModel.findOne({ email });
    if (!checkExistingEmail) {
      const checkExistingNick = await userModel.findOne({  name });
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
    // console.log(masters)
    res.status(200).json({ userAccount });
  } catch (error) {
    console.log(error);
  }
};
