import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { editMasterProfileAC, getMasterAccountAC } from '../../redux/actionCreators/masterAC';
import { RootStateValue } from '../../redux/reducers/rootReducer';
import css from '../Master.module.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const EditMasterProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateValue) => state.master);
  const [name, setName] = useState(user.name);
  const [login, setLogin] = useState(user.login);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [category, setCategory] = useState(user.category.category);
  const [experience, setExperience] = useState(user.experience);
  const [city, setCity] = useState(user.location.city);
  const history = useHistory();


  console.log('EditMasterProfile tsx ===>', user);

  // useEffect(() => {
  //   const getMasterAccount = async () => {
  //     const response = await fetch(
  //       'http://localhost:8080/master/account',
  //       {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         }
  //       }
  //     )
  //     const result = await response.json();
  //     dispatch(getMasterAccountAC(result));
  //   }
  //   getMasterAccount();
  // }, [dispatch]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(editMasterProfileAC(name, login, phoneNumber, email, description, category));
    alert('The data was successfully updated!');
    history.push("/account");
  }

  return (
    <div className={css.masterAccount}>
      <div>
        <Link to='/account'>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to='/account/orders'>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to='/account/profile'>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to='/account/reviews'>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
      <div className={css.masterAccount}>
        <div className={css.profile}>
          <div className={css.name}>
            <img className={css.img} src={user.picture} alt='' />
            <div className={css.login}>
              <form onSubmit={onSubmit}>
                <table>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Name: </span></td>
                      <td>
                        <input
                          className={css.two}
                          value={name}
                          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setName(ev.target.value)}
                        /></td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Login: </span></td>
                      <td>
                        <input
                          className={css.two}
                          value={login}
                          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setLogin(ev.target.value)}
                        />
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>PhoneNumber: </span></td>
                      <td>
                        <input
                          className={css.two}
                          value={phoneNumber}
                          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPhoneNumber(ev.target.value)}
                        />
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Email: </span></td>
                      <td>
                        <input
                          className={css.two}
                          value={email}
                          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setEmail(ev.target.value)}
                        /></td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>About me: </span></td>
                      <td className={css.description}>
                        <input
                          className={css.two}
                          value={description}
                          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setDescription(ev.target.value)}
                        />
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Profession: </span></td>
                      <td>
                        <input
                          className={css.two}
                          value={category}
                          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setCategory(ev.target.value)}
                        /></td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>Experience: </span></td>
                      <td>
                        <input
                          className={css.two}
                          value={experience}
                          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setExperience(ev.target.value)}
                        /></td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>City: </span></td>
                      <td>
                        <input
                          className={css.two}
                          value={city}
                          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setCity(ev.target.value)}
                        />
                      </td>
                    </div>
                  </tr>
                  <tr>
                    <div className={css.margin}>
                      <td className={css.one}><span>My rating: </span></td>
                      <td>{user.rating}</td>
                    </div>
                  </tr>
                </table>
                <button type='submit' className={css.btn}>Edit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


