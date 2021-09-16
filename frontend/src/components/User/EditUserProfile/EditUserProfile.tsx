import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editUserProfileAC } from "../../../redux/actionCreators/userAC";
import { User } from "../../../redux/initState";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./EditUserProfile.scss";
import css from '../User.module.css'
import { HeaderUser } from "../HeaderUser.tsx/HeaderUser";
import "./EditUserProfile.scss";

export const EditUserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState<User>();
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    fetch("http://localhost:8080/user/account", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
      .then((result) => {
        setUser(result.userAccount);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setLogin(user?.login);
      setEmail(user?.email);
      setName(user?.name);
    }
  }, [user]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      editUserProfileAC(
        name,
        login,
        email,
      )
    );
    alert("The data was successfully updated!");
    history.push("/account");
  };

  return (
    // <div className="mainEditUser">
    //   <div className="">
    //     <Link to="/account">
    //       <button className="btn userBtn">My profile</button>
    //     </Link>
    //     <Link to="/account/edit">
    //       <button className="btn userBtn">Edit profile</button>
    //     </Link>
    //     <Link to="/account/orders">
    //       <button className="btn userBtn ">My orders</button>
    //     </Link>
    //     <Link to="/account/reviews">
    //       <button className="btn userBtn ">Rewievs</button>
    //     </Link>
    //   </div>
    //   <div>
    //     <div className="userEditCard">
    //       <div className="tableEditUser">
            
    //         <img className="pictureEdit"
    //         src={user?.picture} alt='' />
    //         <div>
    //           <table className="tableOnly">
    //             <tr className="trEditUser">
    //               <div className="">
    //                 <td><span>Name: </span></td>
    //                 <td>
    //                   <input
    //                     className="inputEditUser"
    //                     value={name}
    //                     onChange={(
    //                       ev: React.ChangeEvent<HTMLInputElement>
    //                     ): void => setName(ev.target.value)}
    //                   />
    //                 </td>
    //               </div>
    //             </tr>
    //             <tr className="trEditUser">
    //               <div className="">
    //                 <td><span>Login: </span></td>
    //                 <td>
    //                   <input
    //                     className="inputEditUser"
    //                     value={login}
    //                     onChange={(
    //                       ev: React.ChangeEvent<HTMLInputElement>
    //                     ): void => setLogin(ev.target.value)}
    //                   />
    //                 </td>
    //               </div>
    //             </tr>
    //             <tr className="trEditUser">
    //               <div className="">
    //                 <td><span>Email: </span></td>
    //                 <td>
    //                   <input
    //                     className="inputEditUser"
    //                     value={email}
    //                     onChange={(
    //                       ev: React.ChangeEvent<HTMLInputElement>
    //                     ): void => setEmail(ev.target.value)}
    //                   />
    //                 </td>
    //               </div>
    //             </tr>
    //           </table>
    <div className="mainUser">
      <div className={css.link}>
        <HeaderUser />
      </div>
      <div>
        <div className="userCard">
          <div className="tableUser">

            <img className="picture"
              src={user?.picture} alt='' />
            <div className="">
              <form onSubmit={onSubmit}>
                <table>
                  <tr>
                    <div className="">
                      <td className=""><span>Name: </span></td>
                      <td>
                        <input
                          className=""
                          value={name}
                          onChange={(
                            ev: React.ChangeEvent<HTMLInputElement>
                          ): void => setName(ev.target.value)}
                        />
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <div className="">
                      <td className=""><span>Login: </span></td>
                      <td>
                        <input
                          className=""
                          value={login}
                          onChange={(
                            ev: React.ChangeEvent<HTMLInputElement>
                          ): void => setLogin(ev.target.value)}
                        />
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <div className="">
                      <td className=""><span>Email: </span></td>
                      <td>
                        <input
                          className=""
                          value={email}
                          onChange={(
                            ev: React.ChangeEvent<HTMLInputElement>
                          ): void => setEmail(ev.target.value)}
                        />
                      </td>
                    </div>
                  </tr>
                </table>
                <button className={css.btn} type="submit">
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
