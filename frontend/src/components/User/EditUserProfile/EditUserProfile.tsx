import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../redux/initState";
import "../UserAccount/UserAccount.scss";

export const EditUserProfile = () => {
  const [user, setUser] = useState<User>();
  // const dispatch = useDispatch();
  // const user = useSelector((state: RootStateValue) => state.master)

  useEffect(() => {
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

  const [name, setName] = useState(
    //@ts-ignore
    user?.userAccount?.name);
  const [login, setLogin] = useState(
    //@ts-ignore
    user?.userAccount?.login);
  const [email, setEmail] = useState(
    //@ts-ignore
    user?.userAccount?.email);
  
  // console.log(
  //   //@ts-ignore
  //   'EditUserProfile =====>', user?.userAccount);

  return (
    <div className="mainUser">
      <div className="">
        <Link to="/account">
          <button className="btn userBtn">My profile</button>
        </Link>
        <Link to="/account/edit">
          <button className="btn userBtn">Edit profile</button>
        </Link>
        <Link to="/account/orders">
          <button className="btn userBtn ">My orders</button>
        </Link>
        <Link to="/account/reviews">
          <button className="btn userBtn ">Rewievs</button>
        </Link>
      </div>
      <div>
        <div className="userCard">
          <div className="tableUser">
            
            <img className="picture"
            //@ts-ignore
            src={user ? user?.userAccount?.picture : ''} alt='' />
            <div className="">
              <table>
                <tr>
                  <div className="">
                    <td className=""><span>Name: </span></td>
                    <td>
                      <input
                        className=""
                        value={
                          //@ts-ignore
                          user ? user?.userAccount?.name : ''}
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
                        value={
                          //@ts-ignore
                          user ? user?.userAccount?.login : ''}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setLogin(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
                {/* <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>PhoneNumber: </span></td>
                    <td>{user ? user.phoneNumber : ''}</td>
                  </div>
                </tr> */}
                <tr>
                  <div className="">
                    <td className=""><span>Email: </span></td>
                    <td>
                      <input
                        className=""
                        value={
                          //@ts-ignore
                          user ? user?.userAccount?.email : ''}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setEmail(ev.target.value)}
                      />
                    </td>
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
                {/* <tr>
                  <div className={css.margin}>
                    <td className={css.one}><span>My rating: </span></td>
                    <td>{
                    //@ts-ignore
                   user.userAccount.rating}</td>
                  </div>
                </tr> */}
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
}


