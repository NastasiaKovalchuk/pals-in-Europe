import React, { ChangeEvent, useEffect } from "react";
import { useState, useCallback } from "react";
import { useParams } from "react-router";
import { YMaps, Map } from "react-yandex-maps";
import { Master } from "../redux/initState";
import CardMaster from "../CardMaster/CardMaster";
import "./ShowMasters.scss";

type MastersValue = {
  value: string;
};

export const ShowMasters = () => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [chosenCategory, setChosenCategory] = useState("");
  const [chosenLocation, setChosenLocation] = useState("");

  const [cities, setCities] = useState<string[]>([]);

  const findMastersBtn = (
    event: React.FormEvent,
    category: string,
    location: string
  ) => {
    event.preventDefault();
    console.log(event.target);

    setMasters(
      masters.filter((master) => master.category.category === category && master.location === location)
    );
  };

  const findCategories = (e: ChangeEvent) => {
    //@ts-ignore
    setChosenCategory(e.target.value);
  };
  const findLocation = (e: ChangeEvent) => {
    //@ts-ignore
    setChosenLocation(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8080/master/")
      .then((res) => res.json())
      .then((result) => {
        //   if (value) {
        //       setMasters(result.masters.filter((master: Master) => master.category.category === value))
        //   } else {
        setMasters(result.masters);
        console.log(result);
        //   }
      });
  }, []);

  useEffect(() => {
    if (masters) {
      setCategories(masters.map((master) => master.category.category));
      setCities(masters.map((master) => master.location));
    }
  }, [masters]);

  const { value } = useParams<MastersValue>();
  return (
    <div className="maindiv">
      <div className="mastersDiv">
        <span>Found masters:</span>
        <div className="selects">
          <div>
            <p>Category</p>
            <select
              className="form-select selectone"
              required
              aria-label="select example"
              name="category"
              id=""
              onChange={findCategories}
            >
              <option hidden disabled selected value="">
                All categories
              </option>
              {categories
                ? categories.map((category) => (
                  <option value={category}>{category}</option>
                ))
                : ""}
            </select>
          </div>

          <div>
            <p>Location</p>
            <select
              className="form-select selectone"
              required
              aria-label="select example"
              name="location"
              id=""
              onChange={findLocation}
            >
              <option hidden disabled selected value="">
                All locations
              </option>
              {cities
                ? cities.map((city) => <option value={city}>{city}</option>)
                : ""}
            </select>
          </div>
        </div>

        <button
          className="btnFind"
          onClick={(e) => findMastersBtn(e, chosenCategory, chosenLocation)}
        >
          Find a master
        </button>
        <div className="cards">
          {masters
            ? masters.map((master: Master) => <p>{master.mastername}</p>)
            : ""}
        </div>
        
      </div>
      <div className="ymaps">
        <YMaps>
          <Map
            defaultState={{ center: [49.75, 14.57], zoom: 5 }}
            className="map"
          />
        </YMaps>
      </div>
    </div>
  );
};
