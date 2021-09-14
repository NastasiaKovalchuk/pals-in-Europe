import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStateValue } from "../redux/reducers/rootReducer";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import "./OneMasterPage.scss";
import css from "./Modal.module.css";
import { Master } from "../redux/initState";
// import { Modal } from './Modal';
import { Footer } from "../Footer/Footer";
import { createOrderAC } from "../redux/actionCreators/userAC";
type IdParams = {
  id: string;
};

export const OneMasterPage = () => {
  const [oneMasterObj, setOneMasterObj] = useState<Master>();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [service, setService] = useState('');
  const { id } = useParams<IdParams>();
  const dispatch = useDispatch();
  const selectorMasters = useSelector((state: RootStateValue) => state.masters);
  const session = useSelector((state: RootStateValue) => state);
  console.log('session ===>', session);

  useEffect(() => {
    if (selectorMasters) {
      const master = selectorMasters.filter((el) => el._id === id);
      setOneMasterObj(master[0]);
    }
  }, [id, selectorMasters]);

  //@ts-ignore
  // console.log(oneMasterObj);
  const onClick = () => {
    setShow(true);
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createOrderAC(name, comment, date, service, id));
    setShow(false)
    setName('');
    setComment('');
    setDate('');
    setService('');
    alert('Your application is accepted!')
  }

  return (
    <>
      {show ?
        <>
          <div className={show ? css.overlay : css.hide}>
            <form onSubmit={onSubmit} className={show ? css.modal : css.hide}>
              <p>You have chosen the master: {oneMasterObj?.name}</p>
              <input
                placeholder="name"
                value={name}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setName(ev.target.value)
                } />
              <input
                placeholder="comment for the master"
                value={comment} style={{ height: 100 }}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setComment(ev.target.value)
                } />
              <input
                placeholder="date"
                value={date}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setDate(ev.target.value)
                } />
              <input
                placeholder="service"
                value={service}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setService(ev.target.value)
                } />
              <button className={css.btn} type="submit">
                Отправить
              </button>
            </form>
          </div>
        </>
        :
        <>
          <div>Нет модального окна</div>
        </>
      }
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
            {session.user.role === 'user' ?
              <button onClick={onClick} className="btn contactBtn" type="submit">
                Contact the master
              </button>
              : ""
            }
            {session.user.role === 'user' ?
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
