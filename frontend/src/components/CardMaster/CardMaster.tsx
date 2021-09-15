import React from "react";
// import { useState, useCallback } from "react";
// import { useHistory } from "react-router-dom"
import { Master } from "../../redux/initState";
import "./CardMaster.scss";
//@ts-ignore
import { Link } from "react-router-dom";
// import { AiFillUnlock } from "react-icons/ai";

const CardMaster = ({ master }: { master: Master }) => {
  return (
    <>
      <div className="cardDiv">
        <img src={master.picture} className="picture" alt="..." />
        {/* <SmileOutlined /> */}
        <div className="cardBody">
          <div className="mastername">{master.name}</div>
          <hr className="dropdown-divider" />
          <p className="category">{master.category.category}</p>
          <p>{master.location ? master.location.city : ""}</p>
          <div className="topRating">Rating: {master.rating}</div>
          <Link
            to={`/master/${master._id}`}
            className="btn btn-primary stretched-link masterBtn"
          >
            {master.name}'s profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default React.memo(CardMaster);
