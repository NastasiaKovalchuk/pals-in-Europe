import css from "../User.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStateValue } from '../../../redux/reducers/rootReducer';
import { useEffect, useState } from "react";
import { User } from "../../../redux/initState";

export interface Review {
  _id: string,
  text: string,
  author: User,
  createdAt: string,
  updatedAt: string,
}

export const ReviewsUser = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const masters = useSelector((state: RootStateValue) => state.masters)
  const user = useSelector((state: RootStateValue) => state.user)


  useEffect(() => {
    if (masters.length > 0) {
      const arr = masters.map(master => master.reviews).flat()
      const result = arr.filter(review => review.author._id === user.userID)
      setReviews(result)
    }
  }, [masters, user.userID]);

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
