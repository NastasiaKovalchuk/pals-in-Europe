import mongoose from "mongoose";
import { RequestHandler } from "express";
import masterModel, { Master } from "../db/models/master.model";

export const createMaster: RequestHandler = async (req, res, next) => {
  try {
    const { name, login, email, password, experience, category } = req.body as {
      email: string;
      name: string;
      password: string;
      login: string;
      experience: string;
      category: string;
    };

    const checkExistingEmail = await masterModel.findOne({ email });
    if (!checkExistingEmail) {
      const checkExistingName = await masterModel.findOne({ mastername: name });
      if (!checkExistingName) {
        const newMaster = await new masterModel({
          email,
          mastername: name,
          password,
          login,
          experience,
          category,
        });
        newMaster.save();
        if (newMaster) {
          req.session.name = newMaster.mastername;
          return res.status(200).json({
            name: req.session.name,
            masterId: newMaster._id,
            role: 'master'
          });
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

export const loginMaster: RequestHandler = async (req, res, next) => {
  try {
    const { login, password } = req.body as {
      login: string;
      password: string;
    };
    const checkMaster = await masterModel.findOne({ login });
    if (checkMaster) {
      if (checkMaster.password === password) {
        req.session.name = checkMaster.mastername;
        return res.status(200).json({
          success: true,
          name: req.session.name,
          masterId: checkMaster._id,
          role: 'master'
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

export const getAllMasters: RequestHandler = async (req, res) => {
  try {
    const masters = await masterModel.find();
    console.log(masters);
    
    res.status(200).json({ masters });
  } catch (error) {
    console.log(error);
  }
};

// export const checkMaster: RequestHandler = (req, res, next) => {
//   res.send({ name: req.session.name });
// };
