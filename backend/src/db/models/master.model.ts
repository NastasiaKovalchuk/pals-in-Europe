import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";
import { Review } from "./review.model";

export interface Master {
  _id: string;
  description: string;
  email: string;
  name: string;
  password: string;
  login: string;
  category: object;
  experience: string;
  location: object;
  reviews: Review[];
  rating: number;
  picture: string;
  socialMediaLinks: string[];
  phoneNumber: string;
}

const MasterSchema = new Schema<Master>({
  description: String,
  email: String,
  name: String,
  phoneNumber: String,
  login: String,
  password: String,
  category: {},
  // category: String,
  experience: String,
  location: {},
  reviews: [{}],
  rating: { type: Number, default: 0 },
  picture: String,
  socialMediaLinks: [],
});

const masterModel = model<Master>("Master", MasterSchema);
export default masterModel;
