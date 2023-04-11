import "./create.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../redux/action";
import { Link } from "react-router-dom";

const Create = (props) => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.allTemperaments);
  const [dogData, setDogData] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    temperaments: [],
  });
  const [error, setError] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    temperaments: "",
  });

  const inputHandler = (e) => {
    let value = e.target.value;
    switch (e.target.placeholder) {
      case "Name":
        setDogData({ ...dogData, name: value });
        setError({ ...error, name: "" });
        return;

      case "Image":
        setDogData({ ...dogData, image: value });
        setError({ ...error, image: "" });
        return console.log("image");

      case "Min height":
        setDogData({ ...dogData, minHeight: value });
        setError({ ...error, minHeight: "" });
        return console.log("Min height");

      case "Max height":
        setDogData({ ...dogData, maxHeight: value });
        setError({ ...error, maxHeight: "" });
        return console.log("Max height");

      case "Min weight":
        setDogData({ ...dogData, minWeight: value });
        // setError({ ...error, minWeight: "" });
        return console.log("Min weight");

      case "Max weight":
        setDogData({ ...dogData, maxWeight: value });
        // setError({ ...error, maxWeight: "" });
        return console.log("Max weight");

      case "Life span":
        setDogData({ ...dogData, lifeSpan: value });
        setError({ ...error, lifeSpan: "" });
        return console.log("Life span");

      default:
        return console.log("hola");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!dogData.name) {
      alert("Error");
      return setError({ ...error, name: "Este campo es obligatorio" });
    }

    if (!dogData.image)
      return setError({ ...error, image: "Este campo es obligatorio" });

    if (!dogData.minHeight)
      return setError({ ...error, minHeight: "Este campo es obligatorio" });
    if (!parseInt(dogData.minHeight))
      return setError({
        ...error,
        minHeight: "Este campo debe ser llenado unicamente con numeros",
      });

    if (!dogData.maxHeight)
      return setError({ ...error, maxHeight: "Este campo es obligatorio" });
    if (!parseInt(dogData.maxHeight))
      return setError({
        ...error,
        maxHeight: "Este campo debe ser llenado unicamente con numeros",
      });

    if (!dogData.minWeight)
      return setError({ ...error, minWeight: "Este campo es obligatorio" });
    if (!parseInt(dogData.minWeight))
      return setError({
        ...error,
        minWeight: "Este campo debe ser llenado unicamente con numeros",
      });

    if (!dogData.maxWeight)
      return setError({ ...error, maxWeight: "Este campo es obligatorio" });
    if (!parseInt(dogData.maxWeight))
      return setError({
        ...error,
        maxWeight: "Este campo debe ser llenado unicamente con numeros",
      });

    if (!dogData.lifeSpan)
      return setError({ ...error, lifeSpan: "Este campo es obligatorio" });
    if (!parseInt(dogData.lifeSpan))
      return setError({
        ...error,
        lifeSpan: "Este campo debe ser llenado unicamente con numeros",
      });

    console.log();
    if (dogData.temperaments.length === 0)
      return setError({
        ...error,
        temperaments: "Tiene que elegir por lo menos un temperamento",
      });

    if (dogData.minWeight > dogData.maxWeight) {
      console.log(dogData);
      alert("Peso!");
      return setError({
        ...error,
        minWeight: "El peso minimo no puede ser mayor que el peso maximo!",
      });
    }

    console.log(dogData);
    dispatch(postDog(dogData));
  };

  const temperamentsHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "0") return;

    for (let i = 0; i < dogData.temperaments.length; i++) {
      if (dogData.temperaments[i] === e.target.value) {
        return;
      }
    }

    setDogData({
      ...dogData,
      temperaments: [...dogData.temperaments, e.target.value],
    });
  };

  const temperamentRemove = (id) => {
    let removeTemperament = dogData.temperaments.filter(
      (temperament) => temperament !== id
    );
    setDogData({ ...dogData, temperaments: removeTemperament });
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="createMain">
        <Link to="/Home">
          <div className="goBackButtonDivC">
            <button type="submit" className="goBackButtonC" title="add dog">
              <i className="fa fa-angle-double-left"></i>
            </button>
          </div>
        </Link>
        <div className="formBox">
          <h1>Upload dog</h1>
          <form onSubmit={submitHandler}>
            <div className="nameBox">
              <input type="text" placeholder="Name" onChange={inputHandler} />
            </div>
            <p className="errorMessage">{error.name}</p>
            <div className="image">
              <input type="text" placeholder="Image" onChange={inputHandler} />
            </div>
            <p className="errorMessage">{error.image}</p>

            <div className="height">
              <input
                type="text"
                placeholder="Min height"
                onChange={inputHandler}
              />
              <p className="guion">&nbsp;-&nbsp;</p>
              <input
                type="text"
                placeholder="Max height"
                onChange={inputHandler}
              />
            </div>
            <p className="errorMessage">
              {error.minHeight ? error.minHeight : error.maxHeight}
            </p>

            <div className="weight">
              <input
                type="text"
                placeholder="Min weight"
                onChange={inputHandler}
              />
              <p className="guion">&nbsp;-&nbsp;</p>
              <input
                type="text"
                placeholder="Max weight"
                onChange={inputHandler}
              />
            </div>
            <p className="errorMessage">
              {error.minWeight ? error.minWeight : error.maxWeight}
            </p>

            <div className="lifeBox">
              <input
                type="text"
                placeholder="Life span"
                onChange={inputHandler}
              />
            </div>
            <p className="errorMessage"> {error.lifeSpan}</p>

            <div className="temperaments">
              <select className="createSelect" onChange={temperamentsHandler}>
                <option className="createOption" value="0">
                  Temperaments ▼
                </option>
                {temperaments.map((element) => (
                  <option
                    className="createOption"
                    key={element.name}
                    value={element.id}
                    name={element.name}
                  >
                    {element.id} - {element.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="errorMessage">{error.temperaments}</p>

            <div className="temperamentsBox">
              {dogData.temperaments &&
                dogData.temperaments.map((id) => {
                  return (
                    <p
                      key={id}
                      className="temperamentText"
                      onClick={() => temperamentRemove(id)}
                      value={id}
                    >
                      {temperaments[id - 1].name}
                    </p>
                  );
                })}
            </div>

            <div className="send">
              <input
                className="submitButton"
                type="submit"
                placeholder="Send"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
