const faker = require('faker');
import categoryModel from "../models/category.model";

const categories: object[] = []

async function categoryMaker() {
  for (let i = 0; i < 20; i += 1) {
    const category = faker.name.jobType();
    
    categories.push({
      category
    })
  }
  await categoryModel.insertMany(categories)
  console.log('Seed Categories Done!');
}
// this function is run in the file connect.ts
export { categoryMaker,  categories};
