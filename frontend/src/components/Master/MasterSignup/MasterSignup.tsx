import { useState } from "react";
import css from '../Master.module.css';
import { masterSignupAC } from '../../redux/actionCreators/masterAC';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const MasterSignup = () => {
  const [errorSignup, setErrorSignup] = useState(false);
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [experience, setExperience] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(masterSignupAC(name, login, email, password, category, experience));
    history.push("/");
  }

  return (
    <div>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setName(ev.target.value)}
          placeholder="Name"
          value={name}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setLogin(ev.target.value)}
          placeholder="Login"
          value={login}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setEmail(ev.target.value)}
          placeholder="Email"
          value={email}
        />
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value)}
          placeholder="password"
          value={password}
        />
        <select
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => setCategory(ev.target.value)}
          placeholder="category"
          value={category}>
          <option >Profession</option>
          <option value='kosmetolog'>kosmetolog</option>
          <option value='makeup'>makeup</option>
          <option value='manikur'>manikur</option>
        </select>
        <input
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setExperience(ev.target.value)}
          placeholder="experience"
          value={experience}
        />
        <button type="submit">Signup</button>
      </form>
      <div>Error</div>
    </div>
  )
}
