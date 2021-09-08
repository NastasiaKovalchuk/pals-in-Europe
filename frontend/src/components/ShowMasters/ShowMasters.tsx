import React from "react";
import { useState, useCallback } from "react";
import { useParams } from "react-router";
import { YMaps, Map } from "react-yandex-maps";
import "./ShowMasters.scss";

type MastersValue = {
  value: string;
};

export const ShowMasters = () => {

  const findMastersBtn = useCallback((event: React.FormEvent) => {
    event.preventDefault()
    
  }, [])

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
              required aria-label="select example"
              name="category" id=""
            >
              <option hidden disabled selected value="">All categories</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div>
            <p>Location</p>
            <select
              className="form-select selectone"
              required aria-label="select example"
              name="location" id=""
            >
              <option hidden disabled selected value="">All locations</option>
              <option value="Amsterdam">Amsterdam</option>
              <option value="Rotterdam">Rotterdam</option>
              <option value="Gouda">Gouda</option>
            </select>
          </div>
        </div>

        <button className="btn" type="submit">Find a masters</button>

      </div>
      <div className="ymaps">
        <YMaps>
          <Map defaultState={{ center: [49.75, 14.57], zoom: 5 }} className="map" />
        </YMaps>
      </div>
    </div>
  );
};
