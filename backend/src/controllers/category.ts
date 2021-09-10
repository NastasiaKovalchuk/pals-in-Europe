import mongoose from "mongoose";
import { RequestHandler } from "express";
import categoryModel from "../db/models/category.model";
import LocationModel from "../db/models/location.model";

export const getAllCategoriesFromSaga: RequestHandler = async (req, res) => {
  try {
    const categoriesFind1 = await categoryModel.find();
    const categoriesFind = categoriesFind1.map(el => el.category)
    
    res.status(200).json({ categoriesFind });
  } catch (error) {
    console.log(error);
  }
};


export const getAllCities: RequestHandler = async (req, res) => {
  try {
    const locations = await LocationModel.find();    
    res.status(200).json({ locations });
  } catch (error) {
    console.log(error);
  }
};