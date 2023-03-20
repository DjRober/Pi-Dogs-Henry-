import "./landing.css";
import React from "react";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <div className="background-image">
      <h1>Dogs Pi</h1>
      <Link to="/Home" className="enterButton">
        <h2>Enter</h2>
      </Link>
    </div>
  );
};

export default Landing;
