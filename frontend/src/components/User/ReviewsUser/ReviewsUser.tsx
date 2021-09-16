import css from "../User.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateValue } from '../../../redux/reducers/rootReducer';
import { useEffect, useState } from "react";
import { User } from "../../../redux/initState";
import { HeaderUser } from "../HeaderUser.tsx/HeaderUser";

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
    // if (masters.length > 0) {
    //   const arr = masters.map(master => master.reviews).flat()
    //   const result = arr.filter(review => review.author._id === user.userID)
    // console.log('result ===>', result);
    // setReviews(masters)
    // }
  }, [masters, user.userID]);

  console.log('reviews ===>', reviews);


  return (
    <div className={css.userAccount}>
      <div className={css.link}>
        <HeaderUser />
      </div>
      <h4>My reviews</h4>
      {masters ?
        masters.map((master, index) => (
          master.reviews.length > 0 ?
          master.reviews.map((review) => (
            review.author._id === user.userID &&
            <>
              <div className={css.reviewsCard} key={index}>
                <img  src={master.picture} alt='' />
                <div className={css.textReviews}>
                  <div><span>Master: </span>{master.name}</div>
                  <div><span>Date of creation: </span>{review.createdAt.slice(0, 10)}</div>
                  <div><span>Text: </span>{review.text}</div>
                </div>
              </div>
            </>
          ))
          :  <div>You have no reviews</div>
        ))
        :
        <div>You have no reviews</div>
      }
    </div>
  )
}
