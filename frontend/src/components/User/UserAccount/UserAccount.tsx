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
                    <td className="tdUser"><span>Name: </span></td>
                    <td className="tdUser">{
                    user ? user.name : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className="">
                    <td className="tdUser"><span>Login: </span></td>
                    <td className="tdUser">{
                    user ? user.login : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className="">
                    <td className="tdUser"><span>Email: </span></td>
                    <td className="tdUser">{
                    user ? user.email : ''}</td>
                  </div>
                </tr>
                <tr>
                  <div className="">
                    <td className="tdUser"><span>My rating: </span></td>
                    <td className="tdUser">{
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
