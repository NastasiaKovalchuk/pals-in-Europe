import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import css from "../Master.module.css";
import { Link, useParams } from "react-router-dom";

import { Master } from "../../redux/initState";

export interface IdParams {
  id: string;
}

export const MasterAccount = () => {
  const [user, setUser] = useState<Master>();
  const { id } = useParams<IdParams>();
  const masters = useSelector((state: RootStateValue) => state.masters);

  useEffect(() => {
    const findAccountInfo = masters.find((el) => el._id === id);
    if (findAccountInfo) setUser(findAccountInfo);
  }, [id, masters]);

  return (
    <div className={css.masterAccount}>
      <div>
        <Link to={`/account/${user?._id}`}>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to={`/account/orders/${user?._id}`}>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to={`/account/profile/${user?._id}`}>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to={`/account/reviews/${user?._id}`}>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
      <div>
        <div className={css.masterAccount}>
          <div className={css.profile}>
            <div className={css.name}>
              <img className={css.img} src={user ? user.picture : ''} alt="" />
              <div className={css.login}>
                <table>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}>
                        <span>Name: </span>
                      </td>
                      <td>{user ? user.name : ''}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}>
                        <span>Login: </span>
                      </td>
                      <td>{user ? user.login : ''}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}>
                        <span>PhoneNumber: </span>
                      </td>
                      <td>{user ? user.phoneNumber : ''}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}>
                        <span>Email: </span>
                      </td>
                      <td>{user ? user.email : ''}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}>
                        <span>About me: </span>
                      </td>
                      <td className={css.description}>{user ? user.description : ''}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}>
                        <span>Profession: </span>
                      </td>
                      <td>{user && user.category ? user.category.category : ''}</td>
                    </div>
                  </tr>
                  <tr>
                    <div>
                      <td className={css.one}>
                        <span>Experience: </span>
                      </td>
                      <td>{user ? user.experience : ''}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}>
                        <span>My rating: </span>
                      </td>
                      <td>{user ? user.rating : ''}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}>
                        <span>City: </span>
                      </td>
                      <td>{user ? user.location.city : ''}</td>
                    </div>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
