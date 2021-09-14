import { useState } from "react";
import css from "../Master.module.css";
import { masterSignupAC } from "../../redux/actionCreators/userAC";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { Category } from "../../redux/initState";

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
  const user = useSelector((state: RootStateValue) => state.user);
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
        street, phoneNumber)
    );
  };

  // console.log(categories);

  return (
    <div>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setName(ev.target.value)
          }
          placeholder="Name"
          value={name}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setLogin(ev.target.value)
          }
          placeholder="Login"
          value={login}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setEmail(ev.target.value)
          }
          placeholder="Email"
          value={email}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setPassword(ev.target.value)
          }
          placeholder="password"
          value={password}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setPhoneNumber(ev.target.value)
          }
          placeholder="phoneNumber"
          value={phoneNumber}
        />
        <select
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setCategory(ev.target.value)
          }
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
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setDescription(ev.target.value)
          }
          placeholder="About you"
          value={description}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSocialMediaLinks(ev.target.value)
          }
          placeholder="About you"
          value={socialMediaLinks}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setCity(ev.target.value)
          }
          placeholder="city"
          value={city}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setStreet(ev.target.value)
          }
          placeholder="street"
          value={street}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setExperience(ev.target.value)
          }
          placeholder="experience"
          value={experience}
        />
        <button type="submit">Signup</button>
      </form>
      <div>{errorMessage}</div>
    </div>
  );
};
