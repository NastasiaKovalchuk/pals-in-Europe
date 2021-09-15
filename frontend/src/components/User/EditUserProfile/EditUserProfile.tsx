import { useEffect, useState } from "react";
import css from "../User.module.css";
import { User } from "../../../redux/initState";
import { Link } from "react-router-dom";

export const EditUserProfile = () => {
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
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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

  return (
    <div className={css.userAccount}>
      <div className={css.link}>
        <Link to="/account">
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to="/account/edit">
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to="/account/orders">
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to="/account/reviews">
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
      <div>
        <div className={css.profile}>
          <div className={css.name}>
            <img
              className={css.img}
              src={user?.picture}
              alt=""
            />
            <div className={css.login}>
              <table>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>Name: </span>
                    </td>
                    <td>
                      <input
                        className={css.two}
                        value={name}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setName(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>Login: </span>
                    </td>
                    <td>
                      <input
                        className={css.two}
                        value={login}
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
                    <td className={css.one}>
                      <span>Email: </span>
                    </td>
                    <td>
                      <input
                        className={css.two}
                        value={email}
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
};
