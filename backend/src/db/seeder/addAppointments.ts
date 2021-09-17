const faker = require("faker");
import masterModel, { Master } from "../models/master.model";
import categoryModel from "../models/category.model";
import LocationModel from "../models/location.model";
import ReviewModel from "../models/review.model";
import userModel from "../models/user.model";

async function appMaker() {
  try {
    console.log("зашли к мастерам");
    const locations = await LocationModel.find();
    const users = await userModel.find();
    const masters = await masterModel.find();
    for (let i = 0; i < masters.length; i += 1) {
        const randomDate: number[] = [];
        const randomHour: number[] = [];
        for (let j = 0; j < 10; j++) {
          const obj: { date: string; time: string; user: {} } = {
            date: "",
            time: "",
            user: {},
          };

          let date = 0;
          do {
            date = Math.floor(Math.random() * 29 + 1);
          } while (randomDate.includes(date));
          let hour = 0;
          do {
            hour = Math.floor(Math.random() * (20 - 10) + 11);
          } while (randomHour.includes(hour));
          obj.date = date + "-09-2021";
          randomDate.push(date);
          obj.time = hour + ":00";
          randomHour.push(hour);
          obj.user = users[Math.floor(Math.random() * users.length)];
          //@ts-ignore
          masters[i].appointments.push(obj);
        }
       masters[i].save();
    }
    console.log("Seed Done!");
  } catch (error) {
    console.log(error);
  }
  // const masters = await masterModel.find();
}
// this function is run in the file connect.ts
export default appMaker;
