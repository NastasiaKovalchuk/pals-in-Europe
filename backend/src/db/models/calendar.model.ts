import { Schema, model } from "mongoose";
import { Master } from "./master.model";

export interface Calendar {
  _id: string,
  master: Master,
  availableDates: []
}

const CalendarSchema = new Schema<Calendar>({
  master: {},
  availableDates: []
});

const CalendarModel = model<Calendar>("Category", CalendarSchema);
export default CalendarModel;
