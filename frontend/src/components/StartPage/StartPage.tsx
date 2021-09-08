import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom"
import "./StartPage.scss";

const StartPage = () => {
  const [search, setSearch] = useState("")
  let history = useHistory();

  const sumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    history.push("/search");
  }

  return (
    <div className="d-flex flex-column align-items-center mainDiv">
      <nav>startpage</nav>
      <form onSubmit={sumbitHandler} className="d-flex justify-content-center">
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setSearch(event.target.value)}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search" />
        <button className="btn" type="submit">Search</button>
      </form>
    </div>
  )
}

export default React.memo(StartPage)
