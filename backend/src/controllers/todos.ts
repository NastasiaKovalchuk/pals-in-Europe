import mongoose from "mongoose";
import { RequestHandler } from "express";
import todoModel, { Todo } from "../db/models/todo.models";
import userModel from "../db/models/user.model";

// export const createTodo: RequestHandler = (req, res) => {
//   try {
//     setTimeout(async () => {
//       const text = (req.body as { text: string }).text;
//       const id = (req.body as { id: string }).id;
//       const user = await userModel.findById(id);
//       const newTodo = await todoModel.create({ text, completed: false });
//       if (user) {
//         user.todos.push(newTodo);
//         user.save();
//         return res.status(200).json({ message: "Created the todo", newTodo });
//       }
//     }, 500);
//   } catch (err) {
//     res.status(500).json({errorMessage: err});
//     throw new Error(err);
//   }
// };

// export const updateStatusTodo: RequestHandler = (
//   req,
//   res,
//   next
// ) => {
//   try {
//     setTimeout(async () => {
//       const { id } = req.params;
//       const userID = (req.body as { userID: string }).userID;
//       const user = await userModel.findById(userID).populate("Use").exec();
//       const findTodo = await todoModel.findById(id);
//       if (findTodo) {
//         findTodo.completed = !findTodo.completed;
//         findTodo.save();
//         let status = findTodo.completed;
//         if (user) {
//           return res.status(200).json({ status });
//         }
//       }
//     }, 500);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const deleteTodo: RequestHandler = (req, res, next) => {
//   try {
//     setTimeout(async () => {
//       const { id } = req.params;
//       const userID = (req.body as { userID: string }).userID;
//       const user = await userModel.findById(userID);
//       const findTodo = await todoModel.findByIdAndRemove(id);
//       if (findTodo) {
//         if (user) {
//           const index = user.todos.findIndex((elem: Todo) => {
//             if (elem._id == id) return elem;
//           });
//           user.todos.splice(index, 1);
//           await user.save();
//           res.status(200).json({ message: "Todo deleted" });
//         }
//       }
//     }, 500);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const getAllTodo: RequestHandler = (req, res) => {
//   try {
//     setTimeout(async () => {
//       const user = await userModel
//         .findById(req.params.id)
//         .populate("todos")
//         .exec();
//       if (user) {
//         const todos = user.todos;
//         res.status(200).json({ todos });
//       }
//     }, 500);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const editTodo: RequestHandler = (req, res, next) => {
//   try {
//     setTimeout(async () => {
//       const { id } = req.params; // id todo
//       const userID = (req.body as { userID: string }).userID;
//       const text = (req.body as { text: string }).text;
//       console.log(id, userID, text);
//       const updateTodo = await todoModel.findByIdAndUpdate(id, { text });
//       if (updateTodo) {
//         updateTodo.save();
//         res.status(200).json();
//       }
//     }, 500);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export const getStatus: RequestHandler = (req, res, next) => {
//   try {
//     setTimeout(async () => {
//       const { id } = req.params; // id todo()
//       const findTodo = await todoModel.findById(id);
//       if (findTodo) {
//         res.status(200).json({ status: findTodo.completed });
//       }
//     }, 500);
//   } catch (error) {
//     throw new Error(error);
//   }
// };
