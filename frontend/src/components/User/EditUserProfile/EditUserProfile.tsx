import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../redux/initState";
import "./EditUserProfile.scss";

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
    <div className="mainEditUser">
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
        <div className="userEditCard">
          <div className="tableEditUser">
            
            <img className="pictureEdit"
            src={user?.picture} alt='' />
            <div>
              <table className="tableOnly">
                <tr className="trEditUser">
                  <div className="">
                    <td><span>Name: </span></td>
                    <td>
                      <input
                        className="inputEditUser"
                        value={name}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setName(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
                <tr className="trEditUser">
                  <div className="">
                    <td><span>Login: </span></td>
                    <td>
                      <input
                        className="inputEditUser"
                        value={login}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setLogin(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
                <tr className="trEditUser">
                  <div className="">
                    <td><span>Email: </span></td>
                    <td>
                      <input
                        className="inputEditUser"
                        value={email}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setEmail(ev.target.value)}
                      />
                    </td>
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
