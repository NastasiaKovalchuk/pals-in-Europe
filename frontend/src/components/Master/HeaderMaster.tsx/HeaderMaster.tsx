import { Link } from "react-router-dom";
import "./HeaderMaster.scss"

export const HeaderMaster = () => {
  return (
    <div className="mainMaster">
      <Link to="/account">
        <button className="btn masterBtn">My profile</button>
      </Link>
      <Link to="/account/edit">
        <button className="btn masterBtn">Edit profile</button>
      </Link>
      <Link to="/account/orders">
        <button className="btn masterBtn">My orders</button>
      </Link>
      <Link to="/account/reviews">
        <button className="btn masterBtn">Reviews</button>
      </Link>
      <Link to="/calendar">
        <button className="btn masterBtn">Calendar</button>
      </Link>
    </div>
  );
};
