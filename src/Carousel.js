import React, {useEffect,useState} from "react";
import "./Carousel.css";

const Carousel = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src="carouselScript.js";
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);

    return(
    <div className="carousel">
    <button className="carousel__button carousel__button--left is-hidden">
      <img src="left-arrow.png" alt="" />
    </button>
    <div className="carousel__track-container">
      <ul className="carousel__track">
        <li className="carousel__slide current-slide">
          <img className="carousel__image " src="./Boomer.png" alt="" />
        </li>
        <li className="carousel__slide">
          <img className="carousel__image" src="./MrSunshine.png" alt="" />
        </li>
        <li className="carousel__slide">
          <img className="carousel__image" src="./ThatDude.png" alt="" />
        </li>
      </ul>
    </div>

    <button className="carousel__button carousel__button--right">
      <img src="./right-arrow.png" alt="" />
    </button>
    <div className="carousel__nav">
      <button className="carousel__indicator current-slide"></button>
      <button className="carousel__indicator"></button>
      <button className="carousel__indicator"></button>
    </div>
  </div>)
}
export default Carousel;