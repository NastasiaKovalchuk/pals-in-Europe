import { Schema, model } from "mongoose";

export interface Location {
  _id: string,
  city: string,
  street: string,
  coordinates: []
}

const LocationSchema = new Schema<Location>({
  city: String,
  street: String,
  coordinates: []
});

const LocationModel = model<Location>("Location", LocationSchema);
export default LocationModel;
