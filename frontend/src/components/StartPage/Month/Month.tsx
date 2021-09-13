import React, { MouseEventHandler } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import CardMaster from "../../CardMaster/CardMaster";
import { setSearchValue } from "../../redux/actionCreators/searchAC";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import "./Month.scss";

const Month = () => {
  const mastersFromSelector = useSelector(
    (state: RootStateValue) => state.masters
  );
  const dispatch = useDispatch();

  const ratingSort = mastersFromSelector.sort((b, a) => 
  a.rating > b.rating ? 1 : -1).slice(0, 10)
  
  const arr = ratingSort.map((el) => el.category.category)
  console.log('ratingSort', arr);


  const history = useHistory();
  //@ts-ignore
  const chooseCategory = (e, category: string) => {
    e.preventDefault()
    dispatch(setSearchValue(category));
    history.push("/showmasters");
  };

  return (
    <div className="bestMasters">
      <div className="bestMastersHead">TOP 10 masters of the month</div>
      <div className="topMasters">
        {ratingSort.map((el, index) => (
          <div key={index} className="topCards">
            {/* <CardMaster key={el._id} master={el} /> */}
            <img src={el.picture} alt=''/>
            <div className="mastername">{el.name}</div>
            <hr className="dropdown-divider" />
            <div className="category">Master {el.category.category}</div>
            {el.rating >= '95' ? 
            <div className="topRating">Rating: {el.rating}</div> :
            <div className="rating">Rating: {el.rating}</div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};
export default React.memo(Month);
