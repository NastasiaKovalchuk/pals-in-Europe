require("dotenv").config();
import mongoose from "mongoose";
import masterMaker from "./seeder/seedMasters";
import { categoryMaker } from "./seeder/seedCategory";
import { reviewsAndLinksMaker } from "./seeder/seedReviews";
import { locationMaker } from "./seeder/seedLocation";

const { DBURL } = process.env;
const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function dbconnect() {
  if (typeof DBURL === "string") {
    await mongoose.connect(DBURL, options, (err) => {
      console.log("success connect mongo");
      if (err) return console.log(err);
    });
  }
  // locationMaker();

  // reviewsAndLinksMaker();
  // starting the seeding function
  // masterMaker();
  // categoryMaker()
}

export default dbconnect;
