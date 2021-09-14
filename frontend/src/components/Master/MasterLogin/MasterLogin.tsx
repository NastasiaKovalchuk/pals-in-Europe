import { useState } from "react"
import css from '../Master.module.css';
// import { masterLoginAC } from '../../redux/actionCreators/masterAC';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import { masterLoginAC } from "../../redux/actionCreators/userAC";


export const MasterLogin = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootStateValue) => state.errorMessage);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(masterLoginAC(login, password));
    history.push('/');
  }

  return (
    <div>
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
      </form>
      <div>{errorMessage}</div>
    </div>
  )
}
