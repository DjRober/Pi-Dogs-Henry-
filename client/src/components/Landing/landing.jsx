import "./landing.css";
import React from "react";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <>
      <div className="landingContainer">
        <div className="background-image">
          <h1 className="title">Dogs Pi</h1>
          <Link to="/Home" className="enterButton">
            <h2 className="enter">Enter</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
