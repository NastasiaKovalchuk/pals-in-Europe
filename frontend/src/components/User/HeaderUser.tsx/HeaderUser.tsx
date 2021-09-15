import css from '../User.module.css'
import { Link } from "react-router-dom";

export const HeaderUser = () => {
  return (
    <>
      <Link to="/account">
        <button className={css.btn}>My profile</button>
      </Link>
      <Link to="/account/edit">
        <button className={css.btn}>Edit profile</button>
      </Link>
      <Link to="/account/orders">
        <button className={css.btn}>My orders</button>
      </Link>
      <Link to="/account/reviews">
        <button className={css.btn}>Rewievs</button>
      </Link>
      <Link to="/calendar">
        <button className={css.btn}>Calendar</button>
      </Link>
    </>
  );
};
