import { useState } from "react";
// import css from '../User.module.css';
import { userSignupAC } from "../../../redux/actionCreators/userAC";
import { useDispatch } from "react-redux";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import "./UserSignup.scss";
import { useHistory } from "react-router-dom";
import { errorMessageAC } from "../../../redux/actionCreators/errorMessageAC";
import axios from "axios";

export const UserSignup = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const errorMessage = useSelector(
    (state: RootStateValue) => state.errorMessage
  );

  // const onSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   console.log('ggggggggg', picture);
  //   const formData = new FormData();
  //   formData.append("picture", picture);
  //   // console.log(formData.get());
  //   dispatch(
  //     userSignupAC(name, login, email, password, formData, () => {
  //       history.push("/");
  //     })
  //   );
  //   if (errorMessage !== "") {
  //     dispatch(errorMessageAC(""));
  //   }
  // };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      userSignupAC(name, login, email, password, () => {
        history.push("/");
      })
    );
    if (errorMessage !== "") {
      dispatch(errorMessageAC(""));
    }
  };

  return (
    <div className="all">
      <form className="forms" onSubmit={onSubmit} encType="multipart/form-data">
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
          placeholder="password"
          value={password}
          type="password"
          required
        />
        <input
          className="form-control me-2 inputs"
          onChange={(ev: any) => {            
            //@ts-ignore
            setPicture(ev.target.files[0]);
          }}
          placeholder="Upload picture"
          // value={picture}
          type="file"
          name="picture"
          required
        />
        <button className="btn signupBtnUser" type="submit">
          Signup as User
        </button>
      </form>
      <div className="error">{errorMessage}</div>
    </div>
  );
};
