import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";
import { Master } from "./master.model";
import { User } from "./user.model";

export interface Review {
  _id: string;
  text: string;
  author: object;
  master: object
}

const ReviewSchema = new Schema<Review>(
  {
    author: {},
    text: String,
  },
  {
    timestamps: true,
  }
);

const ReviewModel = model<Review>("Review", ReviewSchema);
export default ReviewModel;
