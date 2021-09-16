// import css from '../User.module.css'
import { Link } from "react-router-dom";
import "./HeaderUser.scss";

export const HeaderUser = () => {
  return (
    <>
      <Link to="/account">
        <button className="btn userBtn">My profile</button>
      </Link>
      <Link to="/account/edit">
        <button className="btn userBtn">Edit profile</button>
      </Link>
      <Link to="/account/orders">
        <button className="btn userBtn">My orders</button>
      </Link>
      <Link to="/account/reviews">
        <button className="btn userBtn">Rewievs</button>
      </Link>
      <Link to="/calendar">
        <button className="btn userBtn">Calendar</button>
      </Link>
    </>
  );
};
