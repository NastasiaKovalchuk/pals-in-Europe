import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAccountAC } from '../../redux/actionCreators/userAC';
import { RootStateValue } from '../../redux/reducers/rootReducer';
import css from '../User.module.css';
import { Route, Switch, Link } from "react-router-dom";
import { EditUserProfile } from "../EditUserProfile/EditUserProfile";
import { OrdersUser } from "../OrdersUser/OrdersUser";
import { ReviewsUser } from "../ReviewsUser/ReviewsUser";

export const UserAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateValue) => state.user)
  console.log('UserAccount tsx ===>', user);

  useEffect(() => {
    const getUserAccount = async () => {
      const response = await fetch(
        'http://localhost:8080/user/account',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      const result = await response.json();
      dispatch(getUserAccountAC(result));
    }
    getUserAccount();
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
            <OrdersUser />
          </Route>
          <Route exact path="/account/profile">
            <EditUserProfile />
          </Route>
          <Route exact path="/account/rewievs">
            <ReviewsUser />
          </Route>
        </Switch>
        {/* <div className={css.userAccount}>
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
        </div>*/}
      </div> 
    </div>
  )
}
