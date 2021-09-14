import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMasterAccountAC } from "../../redux/actionCreators/masterAC";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import css from "../Master.module.css";
import { Link, useParams } from "react-router-dom";
import { IdParams } from "../MasterAccount/MasterAccount";

export const ReviewsMaster = () => {
  const [reviews, setReviews] = useState();
  const { id } = useParams<IdParams>();


  return (
    <div className={css.masterAccount}>
      <div>
        <Link to={`/account/${id}`}>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to={`/account/orders/${id}`}>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to={`/account/profile/${id}`}>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to={`/account/reviews/${id}`}>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
      {/* {reviews.map((review) => {
        return <div></div>
      })
      } */}
      <div>RewievsMaster</div>
    </div>
  );
};
