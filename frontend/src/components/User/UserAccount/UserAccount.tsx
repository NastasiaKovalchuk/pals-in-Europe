import { useEffect, useState } from "react";
import { User } from "../../../redux/initState";
import "./UserAccount.scss";
import { HeaderUser } from "../HeaderUser.tsx/HeaderUser";
import css from '../User.module.css'

export const UserAccount = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch("http://localhost:8080/user/account", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setUser(result.userAccount));
  }, []);

  return (
    <div className="mainUser">
      <div className={css.link}>
        <HeaderUser />
      </div>
      <div>
        <div className="userCard">
          <div className="tableUser">
            
            <img className="picture" 
            src={user?.picture} alt='' />
            <div className="tableInfo">
              <table>
                <tr>
                  <div className="">
                    <td className=""><span>Name: </span></td>
                    <td>{
                    user ? user.name : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className="">
                    <td className=""><span>Login: </span></td>
                    <td>{
                    user ? user.login : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className="">
                    <td className=""><span>Email: </span></td>
                    <td>{
                    user ? user.email : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className="">
                    <td className=""><span>My rating: </span></td>
                    <td>{
                    user ? user.rating : ''}</td>
                  </div>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
