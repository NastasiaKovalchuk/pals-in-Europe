import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserAccountAC } from "../../../redux/actionCreators/userAC";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import css from "../User.module.css";
import { Route, Switch, Link, useParams } from "react-router-dom";
import { EditUserProfile } from "../EditUserProfile/EditUserProfile";
import { OrdersUser } from "../OrdersUser/OrdersUser";
import { ReviewsUser } from "../ReviewsUser/ReviewsUser";
import { Master, User, UserStateValue } from "../../../redux/initState";


export const UserAccount = () => {
  const [user, setUser] = useState<User>();

  // const user = useSelector((state: RootStateValue) => state.user);
  // const dispatch = useDispatch();
  // const user = useSelector((state: RootStateValue) => state.user)

  useEffect(() => {
    // const getUserAccount = async () => {
    fetch("http://localhost:8080/user/account", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setUser(result));
  }, []);

  // console.log('UserAccount =====>', user?.userAccount);


  return (
    <div className={css.userAccount}>
      <div className={css.link}>
        <Link to="/account">
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to="/account/orders">
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to="/account/edit">
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to="/account/reviews">
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
      <div>
        <div className={css.profile}>
          <div className={css.name}>
            
            <img className={css.img} 
            //@ts-ignore
            src={user ? user?.userAccount?.picture : ''} alt='' />
            <div className={css.login}>
              <table>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>Name: </span></td>
                    <td>{
                      //@ts-ignore
                    user ? user.userAccount.name : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>Login: </span></td>
                    <td>{
                       //@ts-ignore
                    user ? user.userAccount.login : ''}</td>
                  </div>
                </tr>
                {/* <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>PhoneNumber: </span></td>
                    <td>{user ? user.phoneNumber : ''}</td>
                  </div>
                </tr> */}
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>Email: </span></td>
                    <td>{
                      //@ts-ignore
                    user ? user.userAccount.email : ''}</td>
                  </div>
                </tr>
                {/* <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>About me: </span></td>
                    <td className={css.description}>{user.description}</td>
                  </div>
                </tr> */}
                {/* <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>Profession: </span></td>
                    <td>{user.category.category}</td>
                  </div>
                </tr> */}
                {/* <tr>
                  <div>
                    <td className={css.one}><span>Experience: </span></td>
                    <td>{user.experience}</td>
                  </div>
                </tr> */}
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>My rating: </span></td>
                    <td>{
                    //@ts-ignore
                    user ? user.userAccount.rating : ''}</td>
                  </div>
                </tr>
                {/* <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>City: </span></td>
                    <td>{user.location.city}</td>
                  </div>
                </tr> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
