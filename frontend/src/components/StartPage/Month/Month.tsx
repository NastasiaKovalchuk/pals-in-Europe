import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import "./Month.scss";

const Month = () => {
  const mastersFromSelector = useSelector(
    (state: RootStateValue) => state.masters
  );

  // const dispatch = useDispatch();

  const ratingSort = mastersFromSelector.sort((b, a) =>
    a.rating > b.rating ? 1 : -1).slice(0, 5)

  // const arr = ratingSort.map((el) => el.category.category)


  // const history = useHistory();
  //@ts-ignore
  // const chooseCategory = (e, category: string) => {
  //   e.preventDefault()
  //   dispatch(setSearchValue(category));
  //   history.push("/showmasters");
  // };

  return (
    <div className="bestMasters">
      <div className="bestMastersHead">TOP 5 masters of the month</div>
      <div className="topMasters">
        {ratingSort.map((el, index) => (
          <Link to={`/master/${el._id}`} className="link" key={index}>
            <div key={index} className="topCards">
              <img src={el.picture} alt="master"/>
              <div className="mastername">{el.name}</div>
              <hr className="dropdown-divider" />
              <div className="category">Master {el.category.category}</div>
              {Number(el.rating) >= 95 ?
                <div className="topRating">Rating: {el.rating}</div> :
                <div className="rating">Rating: {el.rating}</div>
              }
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default React.memo(Month);
