const fetch = require("node-fetch");
import LocationModel from "../models/location.model";
import masterModel from "../models/master.model";
import fs from "fs";

async function locationMaker() {
  try {
    console.log("Зашли сюlа");
    const masters = await masterModel.find();
    //сначала запустить 14-27 строку, потом все, что ниже
    // const info = await fs.readFile("addresses.txt", "utf8", async(err, data) => {
    //   if (err) {
    //     console.error(err);
    //     return ;
    //   }
    //   const arr =await  data.split("\n");
    //   for (let i = 0; i < arr.length; i += 4) {
    //     const newLocation = await LocationModel.create({
    //       street: arr[i].trim(),
    //       city: arr[i + 1].trim(),
    //     });
    //   }
    // });
    const locations = await LocationModel.find();
    const api = "0f8e2dd1-121c-4be5-aeac-8ed33dc30430";
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].coordinates.length < 2) {        
        const URI = `https://geocode-maps.yandex.ru/1.x/?apikey=${api}&format=json&geocode=${locations[i].street},+${locations[i].city},+Netherlands`;
        const encodedURI = await encodeURI(URI);
        const response = await fetch(encodedURI);
        const result = await response.json();
        locations[i].coordinates =
          result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(" ")
            .map((el: string) => Number(el));
        await locations[i].save();
      }
    }
    for (let i = 0; i < masters.length; i++) {
      masters[i].location = locations[i];
      await masters[i].save();
    }

    // const locations = await LocationModel.find();

    console.log("Seed Categories Done!");
  } catch (error) {
    console.log(error);
  }
}
// this function is run in the file connect.ts
export { locationMaker };
