import { Schema, model } from "mongoose";
// import { Todo } from "../../models/todo";

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const TodoSchema = new Schema<Todo>({
  text: String,
  completed: false,
});

const todoModel = model<Todo>("Todo", TodoSchema);
export default todoModel;
