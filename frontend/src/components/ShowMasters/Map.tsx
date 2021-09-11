import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { Master } from "../redux/initState";
import { useDispatch, useSelector } from "react-redux";
import { getMastersAC } from "../redux/actionCreators/mastersAC";
import CardMaster from "../CardMaster/CardMaster";
import "./Map.scss";
import { RootStateValue } from "../redux/reducers/rootReducer";

export const ShowMasters = () => {
  const [showMasters, setShowMasters] = useState<Master[]>([]);
  const [chosenCategory, setChosenCategory] = useState("");
  const [chosenLocation, setChosenLocation] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state: RootStateValue) => state.categories);
  const masters = useSelector((state: RootStateValue) => state.masters);
  const search = useSelector((state: RootStateValue) => state.search);
  console.log(search);

  useEffect(() => {
    fetch("http://localhost:8080/master/")
      .then((res) => res.json())
      .then((result) => {
        dispatch(getMastersAC(result.masters));
      });
  }, [dispatch]);
  // console.log("mastersRedux ===>", masters);

  const [cities, setCities] = useState<string[]>([]);

  const findMastersBtn = (
    event: React.FormEvent,
    category: string,
    location: string
  ) => {
    event.preventDefault();
    if (category !== "" && location !== "") {
      setShowMasters(
        masters.filter(
          (master) =>
            master.category.category === category &&
            master.location.city === location
        )
      );
    } else if (category !== "") {
      const list = masters.filter(
        (master) => master.category.category === category
      );
      setShowMasters(list);
    } else if (location !== "") {
      setShowMasters(
        masters.filter((master) => master.location.city === location)
      );
    }
    setChosenCategory("");
    setChosenLocation("");
  };

  const findCategories = (e: ChangeEvent<HTMLSelectElement>) => {
    setChosenCategory(e.target.value);
  };
  const findLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    setChosenLocation(e.target.value);
  };

  useEffect(() => {
    if (masters.length > 0) {
      if (search.category !== "") {
        setShowMasters(
          masters.filter(
            (master) => master.category.category === search.category
          )
        );
      } else {
        setShowMasters(masters);
      }
    }
    fetch("http://localhost:8080/location/")
      .then((res) => res.json())
      .then((result) => {
        const uniqueCities: string[] = [];
        for (let i = 0; i < result.locations.length; i++) {
          if (!uniqueCities.includes(result.locations[i].city)) {
            uniqueCities.push(result.locations[i].city);
          }
        }
        setCities(uniqueCities);
      });
  }, [masters, search.category]);

  return (
    <div className="maindiv">
      <div className="mastersDiv">
        <span>Our masters: {showMasters.length}</span>
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
              value={chosenCategory}
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
              value={chosenLocation}
            >
              <option hidden disabled selected value="">
                All locations
              </option>
              {cities
                ? cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))
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
          {showMasters
            ? showMasters.map((master) => (
                <CardMaster key={master._id} master={master} />
              ))
            : ""}
        </div>
      </div>
      <div className="ymaps">
        <YMaps>
          <Map
            defaultState={{ center: [49.75, 14.57], zoom: 5 }}
            className="map"
          >
            {masters
              ? masters.map((el) => {
                  if (el.location) {
                    return (
                      <Placemark
                        key={el._id}
                        geometry={el.location.coordinates}
                      />
                    );
                  }
                })
              : ""}
          </Map>
        </YMaps>
      </div>
    </div>
  );
};
