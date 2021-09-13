import React from "react";
// import { useState, useCallback } from "react";
// import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Master } from "../redux/initState";
import { RootStateValue } from "../redux/reducers/rootReducer";
import "./CardMaster.scss";
//@ts-ignore
import { EnvironmentOutlined  } from '@ant-design/icons';
import { Link } from "react-router-dom";

// import { AiFillUnlock } from "react-icons/ai";


const CardMaster = ({ master }: { master: Master }) => {
  const mastersFromSelector = useSelector(
    (state: RootStateValue) => state.masters
  );

  return (
    <>
      <div className="cardDiv">
        <img src={master.picture} className="picture" alt="..." />
        {/* <SmileOutlined /> */}
        <div className="cardBody">
          <div className="mastername">{master.name}</div>
          <hr className="dropdown-divider" />
          <p className="category">{master.category.category}</p>
          {/* <EnvironmentOutlined  />{master.location ? master.location.city : ''} */}
          <div className="topRating">Rating: {master.rating}</div>
          <Link to={`/master/${master._id}`} className="btn btn-primary stretched-link masterBtn">{master.name}'s profile</Link>
        </div>
      </div>
    </>
  )
}

export default React.memo(CardMaster)
