import mongoose from "mongoose";
import { RequestHandler } from "express";
import adminModel, { Admin } from "../db/models/admin.model";


export const loginAdmin: RequestHandler = async (req, res, next) => {
  try {
      const { login, password } = req.body as {
        login: string;
        password: string;
      };
      const checkAdmin = await adminModel.findOne({ login });
      if (checkAdmin) {
        if (checkAdmin.password === password) {
          req.session.name = checkAdmin.login;
          req.session.id = checkAdmin._id;
          return res.status(200).json({
            success: true,
            login: req.session.name,
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

// export const checkAdmin: RequestHandler = (req, res, next) => {
//   res.send({ login: req.session.name});
// };
