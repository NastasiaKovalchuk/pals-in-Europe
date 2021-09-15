import css from "../User.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStateValue } from '../../../redux/reducers/rootReducer';
import { useEffect, useState } from "react";

interface Review {
  _id: object;
  author: object;
  text: string;
  createdAt: any;
}

type Reviews = Review[];

export const ReviewsUser = () => {
  const [reviews, setReviews] = useState<Reviews>();
  // const user = useSelector((state: RootStateValue) => state.master

  return (
    <div className={css.userAccount}>
      <div className={css.link}>
        <Link to='/account'>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to='/account/orders'>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to='/account/edit'>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to='/account/reviews'>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
    </div>
  )
}
