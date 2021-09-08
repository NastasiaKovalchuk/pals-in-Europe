import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";

export interface Master {
  _id: string;
  email: string;
  mastername: string;
  password: string;
  login: string;
  category: string;
  experience: string;
}

const MasterSchema = new Schema<Master>({
  email: String,
  mastername: String,
  login: String,
  password: String,
  category: { type: Schema.Types.ObjectId, ref: "Category"},
  // category: String,
  experience: String,
});

const masterModel = model<Master>("Master", MasterSchema);
export default masterModel;
