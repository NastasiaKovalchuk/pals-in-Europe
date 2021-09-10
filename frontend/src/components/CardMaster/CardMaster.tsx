import React from "react";
// import { useState, useCallback } from "react";
// import { useHistory } from "react-router-dom"
import { Master } from "../redux/initState";
import "./CardMaster.scss";

const CardMaster = ({master}: {master: Master}) => {
  
  return (
    <>
      <div className="card cardDiv">
        <img src={master.picture} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{master.mastername}</h5>
          <p className="card-text">category: {master.category.category}</p>
          <p className="card-text">location: {master.location ? master.location.city : ''}</p>
          <button className="btn btn-primary stretched-link masterBtn">Go somewhere</button>
        </div>
      </div>
    </>
  )
}

export default React.memo(CardMaster)
