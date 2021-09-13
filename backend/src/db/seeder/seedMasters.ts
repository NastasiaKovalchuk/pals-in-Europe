const faker = require("faker");
import masterModel, { Master } from "../models/master.model";
import categoryModel from "../models/category.model";

async function masterMaker() {
  console.log("зашли к мастерам");
  for (let i = 0; i < 2; i += 1) {
    const email = faker.internet.email();
    const mastername = faker.name.findName();
    const login = faker.internet.userName();
    const password = faker.internet.password();
    const categories = await categoryModel.find();
    const category = categories[Math.floor(Math.random() * categories.length)];
    const experience = Math.floor(Math.random() * 20);
    const picture = faker.image.avatar();
    const cities = [
      "Amsterdam",
      "Rotterdam",
      "Gouda",
      "Den Haag",
      "Utrecht",
      "Capelle aan den IJssel",
      "Dordrecht",
      "Goes",
      "Antwerpen",
      "Almere",
      "Hoofddorp",
    ];
    const rating = Math.floor(Math.random() * 100);
    const socialMediaLinks = [];
    for (let i = 0; i < 4; i++) {
      socialMediaLinks.push(faker.internet.url);
    }
    const description = faker.random.words(15);
    const phoneNumber = faker.phone.phoneNumber();
    await masterModel.create({
      description,
      email,
      mastername,
      phoneNumber,
      login,
      password,
      category,
      experience,
      location: cities[Math.floor(Math.random() * cities.length)],
      rating,
      picture,
      socialMediaLinks,
    });
  }
  console.log("Seed Done!");
  // const masters = await masterModel.find();
}
// this function is run in the file connect.ts
export default masterMaker;
