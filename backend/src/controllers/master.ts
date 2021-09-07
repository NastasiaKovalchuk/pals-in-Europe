import mongoose from "mongoose";
import { RequestHandler } from "express";
import masterModel, { Master } from "../db/models/master.model";

export const createMaster: RequestHandler = async (req, res, next) => {
  try {
      const { email, mastername, password, login, experience, category } = req.body as {
        email: string;
        mastername: string;
        password: string;
        login: string;
        experience: string;
        category: string;
      };
      const checkExistingEmail = await masterModel.findOne({ email });
      if (!checkExistingEmail) {
        const checkExistingName = await masterModel.findOne({ mastername });
        if (!checkExistingName) {
          const newMaster = await new masterModel({ email, mastername, password, login, experience, category });
          newMaster.save();
          if (newMaster) {
            req.session.name = newMaster.mastername;
            req.session.id = newMaster._id;
            return res.status(200).json({ masterId: req.session.id });
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

export const loginMaster: RequestHandler = async (req, res, next) => {
  try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const checkMaster = await masterModel.findOne({ email });
      if (checkMaster) {
        if (checkMaster.password === password) {
          req.session.name = checkMaster.mastername;
          req.session.id = checkMaster._id;
          return res.status(200).json({
            success: true,
            username: req.session.name,
            masterId: req.session.id,
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

export const logoutMaster: RequestHandler = (req, res, next) => {
  try {
      req.session.destroy((err) => {
        console.log(err);
      });
      return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error); 
  }
};

export const checkMaster: RequestHandler = (req, res, next) => {
  res.send({ mastername: req.session.name, masterId: req.session.id });
};
