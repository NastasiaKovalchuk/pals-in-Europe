import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";
import { Master } from "./master.model";
import { User } from "./user.model";

export interface Review {
  _id: string;
  text: string,
  author: string | User,
  master: string | Master
}

const ReviewSchema = new Schema<Review>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
  master: { type: Schema.Types.ObjectId, ref: "Master" }
},
{
    timestamps: true
});

const ReviewModel = model<Review>("Review", ReviewSchema);
export default ReviewModel;
