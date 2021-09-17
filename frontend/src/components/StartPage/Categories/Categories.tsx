import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setSearchValue } from "../../../redux/actionCreators/searchAC";
import { RootStateValue } from "../../../redux/reducers/rootReducer";
import "./Categories.scss";

const Categories = () => {
  const categoryFromSelector = useSelector(
    (state: RootStateValue) => state.categories
  );
  const dispatch = useDispatch();

  const history = useHistory();
  const chooseCategory = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, category: string) => {
    e.preventDefault()
    dispatch(setSearchValue(category));
    history.push("/showmasters");
  };

  return (
    <div className="allCategoriesDiv">
      <div className="allCategoriesHead">All categories of Masters</div>
      <div className="categoryList">
        {categoryFromSelector.map((el, index) => (
          <li
            onClick={(event: React.MouseEvent<HTMLLIElement>): void => chooseCategory(event, el)}
            className="oneCategory"
            key={index}
          >
            {el}
          </li>
        ))}
      </div>
    </div>
  );
};
export default React.memo(Categories);
