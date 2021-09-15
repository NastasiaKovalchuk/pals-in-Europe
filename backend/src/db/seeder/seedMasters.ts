const faker = require("faker");
import masterModel, { Master } from "../models/master.model";
import categoryModel from "../models/category.model";
import LocationModel from "../models/location.model";
import ReviewModel from "../models/review.model";
import userModel from "../models/user.model";

async function masterMaker() {
  try {
    console.log("зашли к мастерам");
    const locations = await LocationModel.find();
    const users = await userModel.find();
    for (let i = 0; i < 101; i += 1) {
      const email = faker.internet.email();
      const name = faker.name.findName();
      const login = faker.internet.userName();
      const password = faker.internet.password();
      const categories = await categoryModel.find();
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const experience = Math.floor(Math.random() * 20);
      const picture = faker.image.avatar();
      const rating = Math.floor(Math.random() * 100);
      const socialMediaLinks = [];
      
      for (let i = 0; i < 4; i++) {
        socialMediaLinks.push(faker.internet.url());
      }
      
      const description = faker.random.words(15);
      const phoneNumber = faker.phone.phoneNumber();
      const reviews = [];
      for (let x = 0; x < 11; x++) {
        const review = await ReviewModel.create({
          author: users[Math.floor(Math.random() * users.length)],
          text: faker.random.words(15),
        });
        reviews.push(review);
      }
      // const appointments = [];
      const randomDate: number[] = [];
      const randomHour: number[] = [];
      // for (let i = 0; i < 20; i++) {
      //   const obj: { date: string; time: string; user: {} } = {
      //     date: "",
      //     time: "",
      //     user: {},
      //   };
        
      //   let random1 = 0;
      //   do {
      //     random1 = Math.ceil(Math.random() * 29);
      //   } while (randomDate.includes(random1));
      //   let random2 = 0;
      //   do {
      //     random2 = Math.floor(Math.random() * (20 - 10) + 20);
      //   } while (randomHour.includes(random2));
      //   obj.date = random1 + "-09-2021";
      //   randomDate.push(random1);
      //   obj.time = random2 + ":00";
      //   randomHour.push(random2);
      //   obj.user = users[Math.floor(Math.random() * users.length)];
      //   appointments.push(obj);
      //   console.log('hoi');
      // }
      console.log('hi');
      
      await masterModel.create({
        description,
        email,
        name,
        phoneNumber,
        login,
        password,
        category,
        experience,
        location: locations[i],
        reviews,
        rating,
        picture,
        socialMediaLinks,
        // appointments
      });
    }
    console.log("Seed Done!");
  } catch (error) {
    console.log(error);
  }
  // const masters = await masterModel.find();
}
// this function is run in the file connect.ts
export default masterMaker;
