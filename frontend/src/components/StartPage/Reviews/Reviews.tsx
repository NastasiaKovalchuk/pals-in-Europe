import { EIDRM } from "constants";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Review } from "../../redux/initState";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import "./Reviews.scss";

const Reviews = () => {
  const [review, setReview] = useState<Review[]>([]);
  const masters = useSelector(
    (state: RootStateValue) => state.masters
  );

  useEffect(() => {
    if (masters) {
      const reviewsOnly = masters.map((el) => (el.reviews)).flat()
      // console.log(reviewsOnly);
      
      const randomReviews = []
      for (let index = 0; index <= 3; index++) {
        let random = Math.floor(Math.random() * reviewsOnly.length)
        if (reviewsOnly[random]) {
          randomReviews.push(reviewsOnly[random])
        }
      }
      // console.log('randomReviews', randomReviews);
      setReview(randomReviews)
    }
  }, [masters])


  return (
    <div className="d-flex flex-column align-items-center reviews">
      <div className="title">Reviews about our masters</div>
      <div className="reviewsBody">
        {review.length > 0 ?
          review.map((el: Review) => (
            <div className="rev">
              <div key={el._id} className="review">{el.text}</div>
              {/* <div key={el._id} className="review">{el.author}</div> */}
            </div>
          )) : ""}
      </div>
    </div>
  );
};

export default React.memo(Reviews);
