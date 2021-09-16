import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";
import { Master } from "./master.model";
import { User } from "./user.model";

export interface Order {
  _id: string;
<<<<<<< HEAD
=======
  // number: number;
>>>>>>> 2d104f177a3cf4f364a03c01c0e7f96f72bfb99c
  name: string;
  client: User;
  master: Master;
  comment: string;
  date: string;
  time: string;
  service: string;
  status: string;
}

const OrderSchema = new Schema<Order>(
  {
<<<<<<< HEAD
=======
    // number: Number,
>>>>>>> 2d104f177a3cf4f364a03c01c0e7f96f72bfb99c
    name: String,
    client: {},
    master: {},
    comment: String,
    date: String,
    time: String,
    service: String,
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

const OrderModel = model<Order>("Order", OrderSchema);
export default OrderModel;
