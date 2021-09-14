import { useState } from "react"
import css from "../User.module.css";
import { userLoginAC } from '../../redux/actionCreators/userAC';
import { useDispatch } from "react-redux";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const UserLogin = () => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootStateValue) => state.errorMessage);
  const history = useHistory();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(userLoginAC(login, password))
    history.push('/');
  }

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <input
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setLogin(ev.target.value)}
        placeholder="Login"
        value={login}
      />
      <input
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value)}
        placeholder="password"
        value={password}
      />
      <button type="submit">Login</button>
      <div>{errorMessage}</div>
    </form>
  )
}
