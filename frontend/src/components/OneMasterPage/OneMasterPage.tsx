import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateValue } from "../redux/reducers/rootReducer";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "./OneMasterPage.scss";
import { Master } from "../redux/initState";
type IdParams = {
  id: string;
};

export const OneMasterPage = () => {
  const [oneMasterObj, setOneMasterObj] = useState<Master>();
  const { id } = useParams<IdParams>();

  const selectorMasters = useSelector((state: RootStateValue) => state.masters);

  useEffect(() => {
    if (selectorMasters) {
      const master = selectorMasters.filter((el) => el._id === id);
      setOneMasterObj(master[0]);
    }
  }, [id, oneMasterObj, selectorMasters]);

  return (
    <>
      <div className="idMasterDiv">
        <div className="idHead">
          <img src={oneMasterObj ? oneMasterObj.picture : ""} alt="" />
          <div className="nameAndJob">
            <div className="name">{oneMasterObj ? oneMasterObj.name : ""}</div>
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
            <div className="description">
              {oneMasterObj ? oneMasterObj.description : ""}
            </div>
          </div>
          <div className="location">
            <div className="ymaps">
              <YMaps>
                {oneMasterObj ? (
                  <Map
                    defaultState={{
                      center: [
                        oneMasterObj.location.coordinates[1],
                        oneMasterObj.location.coordinates[0],
                      ],
                      zoom: 8,
                    }}
                    className="map"
                  >
                    <Placemark
                      geometry={[
                        oneMasterObj.location.coordinates[1],
                        oneMasterObj.location.coordinates[0],
                      ]}
                    />
                  </Map>
                ) : (
                  ""
                )}
              </YMaps>
            </div>
            <div className="links">
              <div>City: {oneMasterObj ? oneMasterObj.location.city : ""}</div>
              <hr className="dropdown-divider" />
              <div>CONTACTS:</div>
              <div>sadadad</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(OneMasterPage);
