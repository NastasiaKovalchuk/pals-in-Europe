import React, { ChangeEvent, MouseEventHandler } from "react";
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./StartPage.scss";
import { RootStateValue } from "../redux/reducers/rootReducer";
import { setSearchValue } from "../redux/actionCreators/searchAC";

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
  const dispatch = useDispatch()

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
      dispatch(setSearchValue(search))
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
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="img/1.jpg" className="d-block w-100" alt="ss" />
          </div>
          <div className="carousel-item">
            <img src="img/2.jpg" className="d-block w-100" alt="ss" />
          </div>
          <div className="carousel-item">
            <img src="img/1.jpg" className="d-block w-100" alt="ss" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Предыдущий</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Следующий</span>
        </button>
      </div>
      <form onSubmit={sumbitHandler} className="d-flex justify-content-center">
        <input
          onChange={(e) => chooseCategory(e.target.value)}
          className="form-control me-2 mainInput"
          type="search"
          value={search}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btnSearch" type="submit">
          Search
        </button>
      </form>
      {/* @ts-ignore */}
      {filterCategories && show
        ? filterCategories.map((el, index) => (
            <div key={index} onClick={(e) => getTheRightSearch(e, el)}>
              {el}
            </div>
          ))
        : ""}
      {noCategories ? <div>We don't have such a category</div> : ""}
    </div>
  );
};

export default React.memo(StartPage);
