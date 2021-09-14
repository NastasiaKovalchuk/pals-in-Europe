import css from "../User.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStateValue } from '../../redux/reducers/rootReducer';
import { useEffect, useState } from "react";
import { User } from '../../redux/initState';

export interface Review {
  _id: string,
  text: string,
  author: User,
  createdAt: string,
  updatedAt: string,
}

export const ReviewsUser = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getUserReviews = async () => {
      const response = await fetch("http://localhost:8080/user/reviews", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });
      const result = await response.json();
      // console.log('getUserReviews ===>', result.userReviews);
      setReviews(result.userReviews)
    };
    getUserReviews();
  }, []);


  return (
    <div className={css.userAccount}>
      <div className={css.link}>
        <Link to='/account'>
          <button className={css.btn}>My profile</button>
        </Link>
        <Link to='/account/edit'>
          <button className={css.btn}>Edit profile</button>
        </Link>
        <Link to='/account/orders'>
          <button className={css.btn}>My orders</button>
        </Link>
        <Link to='/account/reviews'>
          <button className={css.btn}>Rewievs</button>
        </Link>
      </div>
      <h4>My reviews</h4>
      {reviews ?
        reviews.map((review, index) => (
          <div className={css.reviewsCard} key={index}>
            <div><span>Date of creation: </span>{review.createdAt.slice(0, 10)}</div>
            <div><span>Text: </span>{review.text}</div>
          </div>
        ))
        :
        <div>You have no reviews</div>
      }
    </div>
  )
}
