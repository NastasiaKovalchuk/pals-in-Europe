import { Schema, model } from "mongoose";

export interface Location {
  _id: string,
  city: string,
  coordinates: []
}

const LocationSchema = new Schema<Location>({
  city: String,
  coordinates: []
});

const LocationModel = model<Location>("Location", LocationSchema);
export default LocationModel;
