import React from "react";
import "./Slider.scss";

const Slider = () => {

  return (
    <div className="d-flex flex-column align-items-center slider">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="img/1.jpg" className="d-block" alt="ss" />
          </div>
          <div className="carousel-item">
            <img src="img/2.jpg" className="d-block" alt="ss" />
          </div>
          <div className="carousel-item">
            <img src="img/3.jpg" className="d-block" alt="ss" />
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
    </div>
  );
};

export default React.memo(Slider);
