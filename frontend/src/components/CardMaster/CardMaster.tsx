import React from "react";
// import { useState, useCallback } from "react";
// import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Master } from "../redux/initState";
import { RootStateValue } from "../redux/reducers/rootReducer";
import "./CardMaster.scss";

const CardMaster = ({ master }: { master: Master }) => {
  const mastersFromSelector = useSelector(
    (state: RootStateValue) => state.masters
  );

  return (
    <>
      <div className="cardDiv">
        <img src={master.picture} className="picture" alt="..." />
        <div className="cardBody">
          <div className="mastername">{master.mastername}</div>
          <hr className="dropdown-divider" />
          <p className="category">{master.category.category}</p>
          <p className="location">Location: {master.location ? master.location.city : ''}</p>
          {master.rating >= 95 ?
            <div className="topRating">Rating: {master.rating}</div> :
            <div className="as"></div>
          }
          <button className="btn btn-primary stretched-link masterBtn">Go somewhere</button>
        </div>
      </div>
    </>
  )
}

export default React.memo(CardMaster)
