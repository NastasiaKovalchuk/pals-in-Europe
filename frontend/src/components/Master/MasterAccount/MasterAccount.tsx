import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMasterAccountAC } from '../../redux/actionCreators/masterAC';
import { RootStateValue } from '../../redux/reducers/rootReducer';
import css from '../Master.module.css';
import { Route, Switch, Link } from "react-router-dom";
import { EditMasterProfile } from "../EditMasterProfile/EditMasterProfile";
import { OrdersMaster } from "../OrdersMaster/OrdersMaster";
import { ReviewsMaster } from "../ReviewsMaster/ReviewsMaster";

export const MasterAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateValue) => state.master)
  // console.log('MasterAccount tsx ===>', user);

  useEffect(() => {
    const getMasterAccount = async () => {
      const response = await fetch(
        'http://localhost:8080/master/account',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      const result = await response.json();
      dispatch(getMasterAccountAC(result));
    }
    getMasterAccount();
  }, [dispatch]);

  return (
    <div className={css.masterAccount}>
      <div>
        <Link to='/account'>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to='/account/orders'>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to='/account/profile'>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to='/account/reviews'>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
      <div>
        <Switch>
          <Route exact path="/account/orders">
            <OrdersMaster />
          </Route>
          <Route exact path="/account/profile">
            <EditMasterProfile />
          </Route>
          <Route exact path="/account/rewievs">
            <ReviewsMaster />
          </Route>
        </Switch>
        <div className={css.masterAccount}>
          <div className={css.profile}>
            <div className={css.name}>
              <img className={css.img} src={user.picture} alt='' />
              <div className={css.login}>
                <table>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Name: </span></td>
                      <td>{user.name}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Login: </span></td>
                      <td>{user.login}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>PhoneNumber: </span></td>
                      <td>{user.phoneNumber}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Email: </span></td>
                      <td>{user.email}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>About me: </span></td>
                      <td className={css.description}>{user.description}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Profession: </span></td>
                      <td>{user.category.category}</td>
                    </div>
                  </tr>
                  <tr>
                    <div>
                      <td className={css.one}><span>Experience: </span></td>
                      <td>{user.experience}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>My rating: </span></td>
                      <td>{user.rating}</td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>City: </span></td>
                      <td>{user.location.city}</td>
                    </div>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


