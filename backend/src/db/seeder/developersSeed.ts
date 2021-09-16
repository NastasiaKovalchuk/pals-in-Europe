const fetch = require("node-fetch");
import LocationModel from "../models/location.model";
import masterModel from "../models/master.model";
import fs from "fs";
import categoryModel from "../models/category.model";
import faker from "faker";
import ReviewModel from "../models/review.model";

export  async function developersMaker() {
  try {
    console.log("START");

    const masters = [
      {
        name: "George Babayan",
        description: "The best boss of Elbrus",
        picture:
          "https://media-exp1.licdn.com/dms/image/C4D03AQHYHxPTKw1lPg/profile-displayphoto-shrink_800_800/0/1539797262417?e=1637193600&v=beta&t=y9C80ufTQsU1Ae6E2lCXJBwGF8p48iCQHGb6hl0NkOA",
        email: "george@gmail.com",
        login: "boss",
      },
      {
        name: "Ilona Golman",
        description: "The boss's boss",
        picture:
          "https://media-exp1.licdn.com/dms/image/C4E03AQEcmp0qiAEtcA/profile-displayphoto-shrink_200_200/0/1617956220068?e=1637193600&v=beta&t=8cshN9-Hp_mhwP578LVh35EG75jLWk-T3AuaLLy5Yio",
        email: "ilona@gmail.com",
        login: "George's boss",
      },
      {
        name: "Semyon Zholobov",
        description: "The funny guy",
        picture:
          "https://media-exp1.licdn.com/dms/image/C4D03AQF057nRGmOOqg/profile-displayphoto-shrink_200_200/0/1630329223881?e=1637193600&v=beta&t=78OASkUv-irTTLo_qfDD_93bs0E-Ic663ZwhPzCYeCg",
        email: "semyon@gmail.com",
        login: "Funny",
      },
      {
        name: "Artyom Konoplyov",
        description: "I'm always happy",
        picture:
          "https://media-exp1.licdn.com/dms/image/C4D03AQE3Kp10R-2EOA/profile-displayphoto-shrink_200_200/0/1622151202112?e=1637193600&v=beta&t=rjl77yTZZzmHC1r895Y_FY1NX_52EHp7j3rvNdw_9DE",
        email: "artyom@gmail.com",
        login: "Serious",
      },
      {
        name: "Michail Pudov",
        description: "I love Anapa",
        picture:
          "https://media-exp1.licdn.com/dms/image/C4D03AQEUEmjXNKihhA/profile-displayphoto-shrink_200_200/0/1586792645786?e=1637193600&v=beta&t=c3N03pmp9zf25hIEpXOkZixcRZvNXu_qSi6vQvF8ukY",
        email: "michail@gmail.com",
        login: "Hey There",
      },
      {
        name: "Just Taras",
        description: "I love ice cream",
        picture: "https://avatars.githubusercontent.com/u/10337999?v=4",
        email: "taras@gmail.com",
        login: "Ice Cream",
      },
    ];

    const category = await categoryModel.findOne({ category: "Developer" });
    // const categories = await categoryModel.find()
    // console.log(categories);
    
    const locations = await LocationModel.find();
    const findReviews = await ReviewModel.find();
    for (let i = 0; i < masters.length; i++) {
      const socialMediaLinks = [];
      for (let i = 0; i < 4; i++) {
        socialMediaLinks.push(faker.internet.url());
      }
      const reviews = [];
      for (let index = 0; index < 11; index++) {
        reviews.push(
          findReviews[Math.floor(Math.random() * findReviews.length)]
        );
      }
      const master = await masterModel.create({
        name: masters[i].name,
        description: masters[i].description,
        picture: masters[i].picture,
        email: masters[i].email,
        login: masters[i].login,
        phoneNumber: faker.phone.phoneNumber(),
        socialMediaLinks,
        rating: Math.floor(Math.random() * 100),
        location: locations[Math.floor(Math.random() * locations.length)],
        password: faker.internet.password(),
        category,
        experience: "30",
        reviews,
      });
    }
    console.log("SEED DONE");
  } catch (error) {
    console.log(error);
  }
}
// this function is run in the file connect.ts
