import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootStateValue } from "../redux/reducers/rootReducer";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "./OneMasterPage.scss";

export const OneMasterPage = () => {
  //@ts-ignore
  const { id } = useParams();
  const selectorMasters = useSelector(
    (state: RootStateValue) => state.masters
  );
  const oneMasterArr = selectorMasters.filter((el) => el._id == id);
  const oneMasterObj = Object.assign({}, ...oneMasterArr)
  console.log(oneMasterObj);

  return (
    <>
      <div className="idMasterDiv">
        <div className="idHead">
          <img src={oneMasterObj.picture} alt=""/>
          <div className="nameAndJob">
            <div className="name">{oneMasterObj.name}</div>
            {/* <div className="job">Master {oneMasterObj.category.category}</div> */}
          </div>
          <button className="btn contactBtn" type="submit">
            Contact the master
          </button>
        </div>
        <hr className="dropdown-divider" />
        <div className="idBody">
          <div className="leftSide">
            <div className="info">INFORMATION</div>
            <div className="description">{oneMasterObj.description}</div>
          </div>
          <div className="location">
            <div className="ymaps">
              <YMaps>
                <Map
                  defaultState={{ center: [49.75, 14.57], zoom: 4 }}
                  className="map"
                >
                
                </Map>
              </YMaps>
            </div>
            <div className="links">
              <div>City: {oneMasterObj.location.city}</div>
              <hr className="dropdown-divider" />
              <div>CONTACTS:</div>
              <div>sadadad</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(OneMasterPage);
