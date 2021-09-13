const faker = require("faker");
import categoryModel from "../models/category.model";
import masterModel from "../models/master.model";
import ReviewModel from "../models/review.model";
import userModel from "../models/user.model";

async function reviewsAndLinksMaker() {
  const categories: object[] = [];
  console.log("Зашли сюда");
  const masters = await masterModel.find();
  for (let i = 0; i < 150; i++) {
    const email = faker.internet.email();
    const login = faker.internet.userName();
    const username = faker.name.firstName();
    const password = faker.internet.password();
    const picture = faker.image.avatar();
    const newUser = await userModel.create({
      email,
      login,
      password,
      username,
      picture,
      rating: Math.floor(Math.random() * 50),
    });
  }
  const users = await userModel.find();
  
  for (let i = 0; i < masters.length; i += 1) {
    for (let j = 0; j < 4; j++) {
      masters[i].socialMediaLinks.push(faker.internet.url());
    }
    for (let x = 0; x < 11; x++) {
        const review = await ReviewModel.create({
            author: users[Math.floor(Math.random() * users.length)]._id,
            text: faker.random.words(15),
            master: masters[i]._id,
        });
        masters[i].reviews.push(review);
    }
    await masters[i].save()
  }
  await categoryModel.insertMany(categories);
  console.log("Seed Categories Done!");
}
// this function is run in the file connect.ts
export { reviewsAndLinksMaker };
