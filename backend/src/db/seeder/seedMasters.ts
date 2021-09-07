const faker = require('faker');
import masterModel from "../models/master.model";

const masters: object[] = []

async function masterMaker() {
  for (let i = 0; i < 25; i += 1) {
    const email = faker.internet.email();
    const mastername = faker.name.findName();
    const login = faker.internet.userName();
    const password = faker.internet.password();
    const category = faker.name.jobType();
    const experience = faker.datatype.number({
      min: 0,
      max: 20,
    }); 
    masters.push({
      email, mastername, login, password, category, experience
    })
  }
  await masterModel.insertMany(masters)
  console.log('Seed Done!');
}
// this function is run in the file connect.ts
export default masterMaker;
