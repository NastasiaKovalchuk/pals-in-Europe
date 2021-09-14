import { useState } from "react"
import { userLoginAC } from '../../redux/actionCreators/userAC';
import { useDispatch } from "react-redux";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserLogin.scss";
import { errorMessageAC } from "../../redux/actionCreators/errorMessageAC";

export const UserLogin = () => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootStateValue) => state.errorMessage);
  const history = useHistory();

  const user = useSelector((state: RootStateValue) => state.user);
  console.log('user=====>>>>', user);
  

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(userLoginAC(login, password, () => {history.push('/');}))
    console.log('errorMessage', errorMessage);
    if (errorMessage !== "") {
      dispatch(errorMessageAC(""))
    }
  }
  console.log('errorMessage 2', errorMessage);
  return (
    <div className="all">
      <form className="forms" onSubmit={onSubmit}>
        <input
          className="form-control me-2 inputsLog"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setLogin(ev.target.value)}
          placeholder="Login"
          value={login}
          required
        />
        <input
          className="form-control me-2 inputsLog"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value)}
          placeholder="Password"
          value={password}
          required
          type="password"
        />
        <button type="submit" className="btn loginButton">Login as User</button>
      </form>
      <div className="error">{errorMessage}</div>
    </div>
  )
}
