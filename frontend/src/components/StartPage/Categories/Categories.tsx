import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import "./Categories.scss";

const Categories = () => {
  const [categoriesAll, setCategoriesAll] = useState<string[]>([]);
  const categoryFromSelector = useSelector(
    (state: RootStateValue) => state.categories
  );
  console.log(categoryFromSelector);

  return (
    <div className="allCategoriesDiv">
      <div className="allCategoriesHead">All categories of Masters</div>
      <div className="categoryList">
        {categoryFromSelector.map((el, index) => (
          <li className="oneCategory" key={index}>{el}</li>
        ) )}
      </div>
    </div>
  )
}
export default React.memo(Categories);
