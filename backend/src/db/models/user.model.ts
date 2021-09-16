import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";

export interface User {
  _id: string,
  email: string,
  name: string,
  password: string,
  login: string,
  rating: number,
  picture: string,
}

const UserSchema = new Schema<User>({
  email: String,
  name: String,
  login: String,
  password: String,
  rating: {type: Number, default: 0},
  picture: String
});

const userModel = model<User>("User", UserSchema);
export default userModel;
