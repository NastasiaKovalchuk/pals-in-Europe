import React from "react";
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom"
import { Master } from "../redux/initState";
import "./CardMaster.scss";

const CardMaster = ({master}: {master: Master}) => {

  return (
    <>
      <div className="card cardDiv">
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{master.mastername}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button className="btn btn-primary stretched-link masterBtn">Go somewhere</button>
        </div>
      </div>
    </>
  )
}

export default React.memo(CardMaster)
