import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";
import { Todo } from "./todo.models";

export interface User {
  _id: string;
  email: string;
  nick: string;
  password: string;
  todos: Todo[];
}

const UserSchema = new Schema<User>({
  email: String,
  nick: String,
  password: String,
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

const userModel = model<User>("User", UserSchema);
export default userModel;
