import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateValue } from "../redux/reducers/rootReducer";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "./OneMasterPage.scss";
import { Master } from "../redux/initState";
import { Footer } from "../Footer/Footer";
type IdParams = {
  id: string;
};

export const OneMasterPage = () => {
  const [oneMasterObj, setOneMasterObj] = useState<Master>();
  const { id } = useParams<IdParams>();

  const selectorMasters = useSelector((state: RootStateValue) => state.masters);
  const session = useSelector((state: RootStateValue) => state);

  useEffect(() => {
    if (selectorMasters) {
      const master = selectorMasters.filter((el) => el._id === id);
      setOneMasterObj(master[0]);
    }
  }, [id, oneMasterObj, selectorMasters]);

  //@ts-ignore
  console.log(oneMasterObj);


  return (
    <>
      <div className="idMasterDiv">
        <img src={oneMasterObj ? oneMasterObj.picture : ""} alt="" />
        <div className="idHead">
          <div className="nameAndJob">
            <div>
              <div className="name">{oneMasterObj ? oneMasterObj.name : ""}</div>
              <div className="job">Master {oneMasterObj ? oneMasterObj.category.category : ""}</div>
            </div>
            <div className="ratingAndExperience">
              <div className="rating">Rating: {oneMasterObj ? oneMasterObj.rating : ""}</div>
              <div className="experience">Experience: {oneMasterObj ? oneMasterObj.experience : ""}</div>
            </div>
          </div>
          <div className="buttons">
            <button className="btn contactBtn" type="submit">
              Contact the master
            </button>
            {session.user.name ?
              <button className="btn reviewBtn" type="submit">
                Write a review
              </button>
              : ""
            }
          </div>
        </div>
        <hr className="dropdown-divider" />
        <div className="idBody">
          <div>
            <div className="leftSide">
              <div className="info">INFORMATION</div>
              <div className="description">
                {oneMasterObj ? oneMasterObj.description : ""}
              </div>
            </div>
            <div className="leftSide">
              <div className="info">INFORMATION</div>
              <div className="description">
                {oneMasterObj ? oneMasterObj.description : ""}
              </div>
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
              <div className="city">City: {oneMasterObj ? oneMasterObj.location.city : ""}</div>
              <hr className="dropdown-divider" />
              <div className="contacts">CONTACTS:</div>
              <div>{oneMasterObj ? oneMasterObj.phoneNumber : ""}</div>
              <div>{oneMasterObj ? oneMasterObj.email : ""}</div>
              {oneMasterObj ?
                //@ts-ignore
                oneMasterObj.socialMediaLinks.map((el, index) => (
                  <Link to={el} key={index}>{el}</Link>
                )) : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(OneMasterPage);
