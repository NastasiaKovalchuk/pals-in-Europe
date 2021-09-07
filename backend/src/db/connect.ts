import mongoose from "mongoose";

const dbUrl = "mongodb://localhost:27017/todos";
const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function dbconnect() {
  await mongoose.connect(dbUrl, options, (err) => {
    console.log("success connect mongo");
    if (err) return console.log(err);
  });
}

export default dbconnect;
