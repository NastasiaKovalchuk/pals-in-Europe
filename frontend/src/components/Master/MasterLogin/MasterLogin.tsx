import { useState } from "react"
// import { masterLoginAC } from '../../redux/actionCreators/masterAC';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import "./MasterLogin.scss";
import { masterLoginAC } from "../../../redux/actionCreators/userAC";
import { errorMessageAC } from "../../../redux/actionCreators/errorMessageAC";


export const MasterLogin = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootStateValue) => state.errorMessage);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(masterLoginAC(login, password, () => {history.push('/');}));
    if (errorMessage !== "") {
      dispatch(errorMessageAC(""))
    }
  }
  
  return (
    <div className="all">
      <form className="forms" onSubmit={onSubmit}>
        <input
          className="form-control me-2 inputsLog"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setLogin(ev.target.value)}
          placeholder="Login"
          value={login}
        />
        <input
          className="form-control me-2 inputsLog"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value)}
          placeholder="Password"
          value={password}
          type="password"
        />
        <button type="submit" className="btn loginButton">Login as Master</button>
      </form>
      <div className="error">{errorMessage}</div>
    </div>
  )
}
