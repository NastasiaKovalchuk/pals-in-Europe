import { Schema, model } from "mongoose";

export interface Category {
  _id: string;
  category: string;
}

const CategorySchema = new Schema<Category>({
  category: String,
});

const categoryModel = model<Category>("Category", CategorySchema);
export default categoryModel;
