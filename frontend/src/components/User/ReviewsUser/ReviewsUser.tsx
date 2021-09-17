/* eslint-disable array-callback-return */
import css from "../User.module.css";
import { useSelector } from "react-redux";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import { Master, User } from "../../../redux/initState";
import { HeaderUser } from "../HeaderUser.tsx/HeaderUser";
import { useEffect, useState } from "react";

export interface Review {
  _id: string;
  text: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export const ReviewsUser = () => {
  const [reviews, setReviews] = useState<void[]>([]);
  const masters = useSelector((state: RootStateValue) => state.masters);
  const user = useSelector((state: RootStateValue) => state.user);

  useEffect(() => {
    if (masters.length > 0) {
      const reviews = masters.map((master: Master) => {
        if (master.reviews.length > 0) {
          master.reviews.map((review: Review) => {
            if (review.author._id === user.userID) {
              return review;
            }
          });
        }
      });
      setReviews(reviews);
    }
  }, [masters, user.userID]);
  return (
    <div className="mainUser">
      <div className={css.link}>
        <HeaderUser />
      </div>
      <h4>My reviews</h4>
      {masters.length > 0 &&
        masters.map(
          (master) =>
            master.reviews.length > 0 &&
            master.reviews.map((review) => {
              if (review.author._id === user.userID) {
                return (
                  <>
                    <div className={css.reviewsCard} key={master._id}>
                      <img src={master.picture} alt="" />
                      <div className={css.textReviews}>
                        <div>
                          <span>Master: </span>
                          {master.name}
                        </div>
                        <div>
                          <span>Date of creation: </span>
                          {review.createdAt.slice(0, 10)}
                        </div>
                        <div>
                          <span>Text: </span>
                          {review.text}
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })
        )}
      <div>{reviews.length < 1 ? "No reviews" : ""}</div>
    </div>
  );
};
