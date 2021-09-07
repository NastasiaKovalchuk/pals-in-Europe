import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";

export interface Admin {
  _id: string;
  login: string;
  password: string;
}

const AdminSchema = new Schema<Admin>({
  login: String,
  password: String,
});

const adminModel = model<Admin>("Admin", AdminSchema);
export default adminModel;
