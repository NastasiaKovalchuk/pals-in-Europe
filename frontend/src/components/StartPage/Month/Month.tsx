import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import "./Month.scss";
import { Master } from "../../../redux/initState";

const Month = () => {
  const [ratingSort, setRatingSort] = useState<Master[]>([]);
  const mastersFromSelector = useSelector(
    (state: RootStateValue) => state.masters
  );

  useEffect(() => {
    if (mastersFromSelector) {
      setRatingSort(
        mastersFromSelector.filter((master) => {
          console.log(master);

          if (master.category.category === "Developer") {
            return master;
          }
        })
      );
    }
  }, [mastersFromSelector]);

  return (
    <div className="bestMasters">
      <div className="bestMastersHead">TOP masters of the month</div>
      <div className="topMasters">
        {ratingSort.map((el: Master, index) => (
          <Link to={`/master/${el._id}`} className="link" key={index}>
            <div key={index} className="topCards">
              <img src={el.picture} alt="master" />
              <div className="mastername">{el.name}</div>
              <hr className="dropdown-divider" />
              <div className="category">Master {el.category.category}</div>
              {Number(el.rating) >= 95 ? (
                <div className="topRating">Rating: {el.rating}</div>
              ) : (
                <div className="rating">Rating: {el.rating}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default React.memo(Month);
