import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";

export interface User {
  _id: string,
  email: string,
  username: string,
  password: string,
  login: string,
  rating: number,
  picture: string,
}

const UserSchema = new Schema<User>({
  email: String,
  username: String,
  login: String,
  password: String,
  rating: Number,
  picture: String
});

const userModel = model<User>("User", UserSchema);
export default userModel;
