import { Schema, model, ObjectId, Types, Mongoose } from "mongoose";
import { Master } from "./master.model";
import { User } from "./user.model";

export interface Order {
  _id: string;
  number: number;
  client: object;
  master: object;
  comment: string;
  date: string;
  service: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Fullfilled' | 'Cancel';
}

const OrderSchema = new Schema<Order>(
  {
    number: Number,
    client: {},
    master: {},
    comment: String,
    date: String,
    service: String,
    status: {type: String, default: "Pending", }
  },
  {
    timestamps: true,
  }
);

const OrderModel = model<Order>("Order", OrderSchema);
export default OrderModel;
