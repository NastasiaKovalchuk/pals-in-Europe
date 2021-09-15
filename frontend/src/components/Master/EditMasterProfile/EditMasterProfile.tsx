import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import css from "../Master.module.css";
import { useHistory } from "react-router-dom";
import { Master } from "../../../redux/initState";
import { editMasterProfileAC } from "../../../redux/actionCreators/mastersAC";
import { HeaderMaster } from "../HeaderMaster.tsx/HeaderMaster";

export const EditMasterProfile = () => {
  const [newUser, setNewUser] = useState<Master>();
  const masters = useSelector((state: RootStateValue) => state.masters);
  const user = useSelector((state: RootStateValue) => state.user);
  const categories = useSelector((state: RootStateValue) => state.categories);
  const dispatch = useDispatch();

  // console.log("EditMasterProfile =>", newUser);
  const [name, setName] = useState("");
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');

  const history = useHistory();
  useEffect(() => {
    if (masters.length > 0) {
      const findAccountInfo = masters.find((el) => el._id === user.masterID);
      // console.log("useEffect", findAccountInfo);
      if (findAccountInfo) {
        setNewUser(findAccountInfo);
        setName(findAccountInfo.name);
        setLogin(findAccountInfo.login);
        setEmail(findAccountInfo.email);
        setExperience(findAccountInfo.experience);
        setDescription(findAccountInfo.description);
        setCity(findAccountInfo.location.city);
        setStreet(findAccountInfo.location.street);
        setPhoneNumber(findAccountInfo.phoneNumber);
      }

    }
  }, [masters, user.masterID]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      editMasterProfileAC(
        name,
        login,
        email,
        category,
        experience,
        description,
        city,
        street,
        phoneNumber
      )
    );
    alert("The data was successfully updated!");
    history.push("/account");
  };

  return (
    <div className={css.masterAccount}>
      <div className={css.link}>
        <HeaderMaster />
      </div>

      <div className={css.profile}>
        <div className={css.name}>
          <img
            className={css.img}
            src={newUser ? newUser?.picture : ""}
            alt=""
          />
          <div className={css.login}>
            <form onSubmit={onSubmit}>
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
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>PhoneNumber: </span>
                    </td>
                    <td>
                      <input
                        className={css.two}
                        value={phoneNumber}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setPhoneNumber(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
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
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>About me: </span>
                    </td>
                    <td className={css.description}>
                      <input
                        className={css.two}
                        value={description}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setDescription(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>Profession: </span>
                    </td>
                    <td>
                      <select
                        onChange={(
                          ev: React.ChangeEvent<HTMLSelectElement>
                        ): void => setCategory(ev.target.value)}
                        placeholder="category"
                        value={category}
                      >
                        <option>Profession</option>
                        {categories
                          ? categories.map((el: string) => (
                            <option value={el}>{el}</option>
                          ))
                          : ""}
                      </select>
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>Experience: </span>
                    </td>
                    <td>
                      <input
                        className={css.two}
                        value={experience}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setExperience(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>City: </span>
                    </td>
                    <td>
                      <input
                        className={css.two}
                        value={city}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setCity(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>Street: </span>
                    </td>
                    <td>
                      <input
                        className={css.two}
                        value={street}
                        onChange={(
                          ev: React.ChangeEvent<HTMLInputElement>
                        ): void => setStreet(ev.target.value)}
                      />
                    </td>
                  </div>
                </tr>
                <tr>
                  <div className={css.margin}>
                    <td className={css.one}>
                      <span>My rating: </span>
                    </td>
                    <td>{newUser?.rating}</td>
                  </div>
                </tr>
              </table>
              <button type="submit" className={css.btn}>
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
