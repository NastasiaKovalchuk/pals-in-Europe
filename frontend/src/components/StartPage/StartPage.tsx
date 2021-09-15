import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./StartPage.scss";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import { setSearchValue } from "../../redux/actionCreators/searchAC";
import Slider from "./Slider/Slider";
import Categories from "./Categories/Categories";
import Month from "./Month/Month";
import { Footer } from "../Footer/Footer";
import HowItsWork from "./HowItsWork/HowItsWork";
import Reviews from "./Reviews/Reviews";
import Speacialist from "./Speacialists/Speacialist";

const StartPage = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [noCategories, setNoCategories] = useState(false);
  const [filterCategories, setfilterCategories] = useState<string[]>([]);
  let history = useHistory();
  // const dispatch = useDispatch();
  const categoryFromSelector = useSelector(
    (state: RootStateValue) => state.categories
  );
  const dispatch = useDispatch();


  const chooseCategory = (value: string) => {
    setSearch(value);
    if (value.length === 0) {
      setfilterCategories([]);
      setShow(false);
      setNoCategories(false);
    } else {
      const regexp = new RegExp(value, "i");
      const check = categoryFromSelector.filter((el) => {
        const returnCheck = el.match(regexp);
        if (returnCheck) {
          return returnCheck;
        }
      });
      setfilterCategories(check);
      if (check.length > 0) {
        setShow(true);
      } else {
        setNoCategories(true);
      }
    }
  };

  const sumbitHandler = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      dispatch(setSearchValue(search));
      history.push("/search");
    },
    [dispatch, search, history]
  );

  const getTheRightSearch = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    text: React.SetStateAction<string>
  ) => {
    event.preventDefault();
    setSearch(text);
    setfilterCategories([]);
  };

  return (
    <div className="d-flex flex-column align-items-center mainDiv">
      <Slider />
      <form
        onSubmit={sumbitHandler}
        className="d-flex justify-content-center mainForm"
      >     

        <input
          id="typeahead-basic"
          onChange={(e) => chooseCategory(e.target.value)}
          className="form-control me-2 mainInput"
          type="search"
          value={search}
          placeholder="Search"
          aria-label="Search"
        >  
        
        </input>
        <button className="btn btnSearch" type="submit">
          Search Masters
        </button>
        <div className="prompt">
          {filterCategories && show
            ? filterCategories.map((el, index) => (
              <div
                className="onePrompt"
                key={index}
                onClick={(e) => getTheRightSearch(e, el)}
              >
                {el}
              </div>
            ))
            : ""}
          {noCategories ? (
            <div className="noPrompt">We don't have such a category</div>
          ) : (
            ""
          )}
        </div>
      </form>
      <Categories />
      <HowItsWork />
      <Month />
      <Reviews />
      <Speacialist />
      <Footer />
    </div>
  );
};

export default React.memo(StartPage);
