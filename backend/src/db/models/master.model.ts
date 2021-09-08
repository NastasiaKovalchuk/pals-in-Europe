import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";

export interface Master {
  _id: string;
  email: string;
  mastername: string;
  password: string;
  login: string;
  category: object;
  experience: string;
  location: string,
}

const MasterSchema = new Schema<Master>({
  email: String,
  mastername: String,
  login: String,
  password: String,
  category: {},
  // category: String,
  experience: String,
  location: String,
});

const masterModel = model<Master>("Master", MasterSchema);
export default masterModel;
