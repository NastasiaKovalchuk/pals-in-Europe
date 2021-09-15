import { useState } from "react";
// import css from "../Master.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MasterSignup.scss";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import { masterSignupAC } from "../../../redux/actionCreators/userAC";
import { errorMessageAC } from "../../../redux/actionCreators/errorMessageAC";

export const MasterSignup = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState("");

  const categories = useSelector((state: RootStateValue) => state.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  const errorMessage = useSelector((state: RootStateValue) => state.errorMessage);
  // console.log('errorMessage!!!!!!! =>', errorMessage);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      masterSignupAC(
        name, login,
        email, password,
        category, experience,
        description, city,
        street, phoneNumber,
        () => { history.push('/'); })
    );
    if (errorMessage !== "") {
      dispatch(errorMessageAC(""))
    }
  };

  // console.log(categories);

  return (
    <div className="all">
      <form className="forms" onSubmit={onSubmit}>
        <div className="signAndAbout">
          <div className="sign">
            <input
              className="form-control me-2 inputs"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setName(ev.target.value)
              }
              placeholder="Name"
              value={name}
              required
            />
            <input
              className="form-control me-2 inputs"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setLogin(ev.target.value)
              }
              placeholder="Login"
              value={login}
              required
            />
            <input
              className="form-control me-2 inputs"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setEmail(ev.target.value)
              }
              placeholder="Email"
              value={email}
              type="email"
              required
            />
            <input
              className="form-control me-2 inputs"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setPassword(ev.target.value)
              }
              placeholder="Password"
              value={password}
              type="password"
              required
            />
          </div>
          <div className="about">
            <input
              className="form-control me-2 inputs"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setPhoneNumber(ev.target.value)
              }
              placeholder="Phone-number"
              value={phoneNumber}
              type="tel"
            />
            <input
              className="form-control me-2 inputs"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setDescription(ev.target.value)
              }
              placeholder="About you"
              value={description}
            />
            <input
              className="form-control me-2 inputs"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setSocialMediaLinks(ev.target.value)
              }
              placeholder="Social media links"
              value={socialMediaLinks}
            />
            <select
              className="form-control me-2 inputs"
              onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                setCategory(ev.target.value)
              }
              placeholder="category"
              value={category}
              required
            >
              <option>Profession   ▽</option>
              {categories
                ? categories.map((el: string) => (
                  <option value={el}>{el}</option>
                ))
                : ""}
            </select>
          </div>
        </div>
        <div className="city">
          <input
            className="form-control me-2 inputs"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setCity(ev.target.value)
            }
            placeholder="City"
            value={city}
          />
          <input
            className="form-control me-2 inputs"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setStreet(ev.target.value)
            }
            placeholder="Street"
            value={street}
          />
          <input
            className="form-control me-2 exp"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setExperience(ev.target.value)
            }
            placeholder="Experience"
            value={experience}
            type="number"
          />
        </div>
        <button className="btn signupBtnMaster" type="submit">Signup as Master</button>
      </form>
      <div className="error">{errorMessage}</div>
    </div>
  );
};
