import "../Home/home.css";

import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link to={`/Home/detail/${props.id}`}>
      <div className="card" style={{ backgroundImage: `url(${props.image})` }}>
        <h1 className="name">{props.name}</h1>
        <div className="temperementsCardContainer">
          <h2 className="temperaments">
            {props.temperaments?.map((temperament) => temperament.name + " ")}
          </h2>
        </div>
        <p className="peso">
          Weight {props.minWeight} - {props.maxWeight} lb
        </p>
      </div>
    </Link>
  );
};

export default Card;
