import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserAccountAC } from "../../redux/actionCreators/userAC";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { Route, Switch, Link, useParams } from "react-router-dom";
import { EditUserProfile } from "../EditUserProfile/EditUserProfile";
import { OrdersUser } from "../OrdersUser/OrdersUser";
import { ReviewsUser } from "../ReviewsUser/ReviewsUser";
import { Master, User, UserStateValue } from "../../redux/initState";
import "./UserAccount.scss";


export const UserAccount = () => {
  const [user, setUser] = useState<User>();

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


  return (
    <div className="mainUser">
      <div className="">
        <Link to="/account">
          <button className="btn userBtn">My profile </button>
        </Link>
        <Link to="/account/edit">
          <button className="btn userBtn">Edit profile</button>
        </Link>
        <Link to="/account/orbtn userBtnders">
          <button className="btn userBtn">My orders</button>
        </Link>
        <Link to="/account/reviews">
          <button className="btn userBtn">Rewievs</button>
        </Link>
      </div>
      <div>
        <div className="userCard">
          <div className="tableUser">
            
            <img className="picture" 
            //@ts-ignore
            src={user ? user?.userAccount?.picture : ''} alt='' />
            <div className="tableInfo">
              <table>
                <tr>
                  <div className="">
                    <td className=""><span>Name: </span></td>
                    <td>{
                      //@ts-ignore
                    user ? user.userAccount.name : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className="">
                    <td className=""><span>Login: </span></td>
                    <td>{
                       //@ts-ignore
                    user ? user.userAccount.login : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className="">
                    <td className=""><span>Email: </span></td>
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
                  <div className="">
                    <td className=""><span>My rating: </span></td>
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
