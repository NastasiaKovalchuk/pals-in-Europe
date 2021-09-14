import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import css from "../Master.module.css";
import { Link } from "react-router-dom";
import { Master } from "../../redux/initState";

export const MasterAccount = () => {
  const [newUser, setNewUser] = useState<Master>();
  const masters = useSelector((state: RootStateValue) => state.masters);
  const user = useSelector((state: RootStateValue) => state.user);
  // console.log('MasterAccount =>', user);

  useEffect(() => {
    const findAccountInfo = masters.find((el) => el._id === user.masterID);
    if (findAccountInfo) setNewUser(findAccountInfo);
  }, [masters, user.masterID]);

  return (
    <div className={css.masterAccount}>
      <div className={css.link}>
        <Link to='/account'>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to='/account/edit'>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to='/account/orders'>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to='/account/reviews'>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>

      <div className={css.profile}>
        <div className={css.name}>
          <img className={css.img} src={newUser ? newUser.picture : ''} alt="" />
          <div className={css.login}>
            <table>
              <tr>
                <div className={css.margin}>
                  <td className={css.one}>
                    <span>Name: </span>
                  </td>
                  <td>{newUser ? newUser.name : ''}</td>
                </div>
              </tr>
              <tr>
                <div className={css.margin}>
                  <td className={css.one}>
                    <span>Login: </span>
                  </td>
                  <td>{newUser ? newUser.login : ''}</td>
                </div>
              </tr>
              <tr>
                <div className={css.margin}>
                  <td className={css.one}>
                    <span>PhoneNumber: </span>
                  </td>
                  <td>{newUser ? newUser.phoneNumber : ''}</td>
                </div>
              </tr>
              <tr>
                <div className={css.margin}>
                  <td className={css.one}>
                    <span>Email: </span>
                  </td>
                  <td>{newUser ? newUser.email : ''}</td>
                </div>
              </tr>
              <tr>
                <div className={css.margin}>
                  <td className={css.one}>
                    <span>About me: </span>
                  </td>
                  <td className={css.description}>{newUser ? newUser.description : ''}</td>
                </div>
              </tr>
              <tr>
                <div className={css.margin}>
                  <td className={css.one}>
                    <span>Profession: </span>
                  </td>
                  <td>{newUser && newUser.category ? newUser.category.category : ''}</td>
                </div>
              </tr>
              <tr>
                <div>
                  <td className={css.one}>
                    <span>Experience: </span>
                  </td>
                  <td>{newUser ? newUser.experience : ''}</td>
                </div>
              </tr>
              <tr>
                <div className={css.margin}>
                  <td className={css.one}>
                    <span>My rating: </span>
                  </td>
                  <td>{newUser ? newUser.rating : ''}</td>
                </div>
              </tr>
              <tr>
                <div className={css.margin}>
                  <td className={css.one}>
                    <span>City: </span>
                  </td>
                  <td>{newUser ? newUser.location.city : ''}</td>
                </div>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
};
