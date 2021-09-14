import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import css from "../User.module.css";
import { Link } from "react-router-dom";
import { User } from "../../redux/initState";

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
  
  console.log(
    //@ts-ignore
    'EditUserProfile =====>', user?.userAccount);

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
                    <td>
                      <input
                        className={css.two}
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
                  <div className={css.margin}>
                    <td className={css.one}><span>Login: </span></td>
                    <td>
                      <input
                        className={css.two}
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
                  <div className={css.margin}>
                    <td className={css.one}><span>Email: </span></td>
                    <td>
                      <input
                        className={css.two}
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


