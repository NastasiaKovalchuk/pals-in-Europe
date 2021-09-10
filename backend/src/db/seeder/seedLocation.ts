const faker = require("faker");
const fetch = require("node-fetch");
//@ts-ignore
import rrag from "real-random-address";
import LocationModel from "../models/location.model";
import masterModel from "../models/master.model";
async function locationMaker() {
  console.log("Зашли сюда");
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
    "Woerden",
    "Groningen",
    "Almelo",
    "Den Helder",
    "Brussels",
    "Mons",
    "Maastricht",
    "Hasselt",
    "Tilburg",
  ];
  const api = "0f8e2dd1-121c-4be5-aeac-8ed33dc30430";
  // for (let i = 0; i < cities.length; i++) {
  //   const URI = `https://geocode-maps.yandex.ru/1.x/?apikey=${api}&format=json&geocode=${cities[i]}`
  //   const encodedURI = await encodeURI(URI);
  //   const response = await fetch(encodedURI);
  //   const result = await response.json()
  //   console.log(result.response.GeoObjectCollection.featureMember[0].GeoObject.boundedBy.Envelope.lowerCorner.split(' ').map((el: string) => Number(el)))
  //   const location = LocationModel.create({city: cities[i], coordinates: result.response.GeoObjectCollection.featureMember[0].GeoObject.boundedBy.Envelope.lowerCorner.split(' ').map((el: string) => Number(el))})
  // }

  const masters = await masterModel.find();
  const locations = await LocationModel.find();
  for (let i = 0; i < masters.length; i++) {
    masters[i].location =
      locations[Math.floor(Math.random() * locations.length)];
    masters[i].save();
  }

  console.log("Seed Categories Done!");
}
// this function is run in the file connect.ts
// export { locationMaker };
