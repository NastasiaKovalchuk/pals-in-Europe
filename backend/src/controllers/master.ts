import { mailer } from './mailer';
import mongoose from "mongoose";
import { RequestHandler } from "express";
import masterModel, { Master } from "../db/models/master.model";
import ReviewModel, { Review } from "../db/models/review.model";
import categoryModel from "../db/models/category.model";

export const createMaster: RequestHandler = async (req, res) => {
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
      const checkExistingName = await masterModel.findOne({ login });
      if (!checkExistingName) {
        const newMaster = await new masterModel({
          email,
          name,
          password,
          login,
          experience,
          category,
        });
        await newMaster.save();

        const message = {
          to: email,
          subject: 'Вы успешно зарегистрировались.',
          html: `
          <h2>Поздравляем с успешной регистрацией!</h2>
          <div>Данные вашей учетной записи:</div>
          <ul>
          <li>Логин: ${login},</li>
          <li>Пароль: ${password}.</li>
          </ul>
          Желаем успешных заказов!`
        };
        mailer(message);

        if (newMaster) {
          req.session.user = {
            name: newMaster.name,
            id: newMaster.id
          };
          // console.log(newMaster, req.session.user);
          return res.status(200).json({
            name: req.session.user.name,
            masterId: req.session.user.id,
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
        req.session.user = {
          name: checkMaster.name,
          id: checkMaster.id
        };
        return res.status(200).json({
          name: req.session.user.name,
          masterId: req.session.user.id,
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
    // const populatedReviews  = await ReviewModel.find().populate(["author", "master"]).lean();
    // console.log(populatedReviews);
    
    const masters = await masterModel.find();
    // console.log(masters[205]);
    
    // const map = masters.map((master) => master.populate("author", "master"))
    res.status(200).json({ masters });
  } catch (error) {
    console.log(error);
  }
};

export const getAccountMaster: RequestHandler = async (req, res) => {
  try {
    const masterAccount = await masterModel.findOne({ _id: req?.session?.user?.id });
    res.status(200).json({ masterAccount });
  } catch (error) {
    console.log(error);
  }
};

export const editMasterProfile: RequestHandler = async (req, res) => {
  try {
    console.log('Зашли в ручку editMasterProfile');
    const {
      name,
      login,
      phoneNumber,
      email,
      description,
      category, } = req.body as {
        name: string,
        login: string,
        phoneNumber: string,
        email: string,
        description: string,
        category: string,
      };
    const newCategory = await categoryModel.findOne({ category });
    //@ts-ignore
    const uptdaterMaster = await masterModel.findByIdAndUpdate({ _id: req?.session?.user?.id }, {
      name,
      login,
      phoneNumber,
      email,
      description,
      category: {
        _id: newCategory?._id,
        category: newCategory?.category
      },
    }, { new: true })
    return res.status(200).json({
      uptdaterMaster
    });
  } catch (error) {
    console.log(error);
  }
};
