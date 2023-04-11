import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByName,
  filterByWeight,
  getDogs,
  getDogsByName,
  getTemperaments,
  filterByTemperaments,
  filterApi,
} from "../../redux/action.js";
import Card from "../Card/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
let Alfabetico = "Alfabetico ▼";
let Peso = "Peso ▼";
let temperamentosDiv = [];

const Home = (props) => {
  //dispatch info from stored
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.allTemperaments);
  const dogs = useSelector((state) => state.allDogs);

  //states
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState();
  const [search, setSearch] = useState();

  let max = Math.ceil(dogs.length / 8);

  //Next Prev buttons
  const nextHandler = () => {
    console.log("next");
    setCurrentPage(currentPage + 1 === max + 1 ? currentPage : currentPage + 1);
  };

  const prevHandler = () => {
    console.log("prev");
    setCurrentPage(currentPage - 1 === 0 ? currentPage : currentPage - 1);
  };

  //FIlTROS
  const resetFilter = (e) => {
    console.log("reset filter");
    Alfabetico = "Alfabetico ▼";
    Peso = "Peso ▼";
    temperamentosDiv = [];
    e.preventDefault();
    dispatch(getDogs());

    document.getElementById("selectTemperaments").value = "0";

    setOrder(e.target.value);
    setCurrentPage(1);
  };

  //Por nombre
  const filterByNombre = () => {
    if (Alfabetico === "Alfabetico ▼") {
      dispatch(filterByName());
      Alfabetico = "Alfabetico ▲";
      setOrder(Alfabetico);
    } else {
      dispatch(filterByName("asc"));
      Alfabetico = "Alfabetico ▼";
      setOrder(Alfabetico);
    }
  };

  //Por peso
  const filterByPeso = () => {
    if (Peso === "Peso ▼") {
      dispatch(filterByWeight());
      Peso = "Peso ▲";
      setOrder(Peso);
    } else {
      dispatch(filterByWeight("asc"));
      Peso = "Peso ▼";
      setOrder(Peso);
    }
  };

  //Por temperamentos
  const filterByTemperamentos = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value == 0) return;
    temperamentosDiv.push(e.target.value);
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
  };

  //Api or database
  const databaseChoiceHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "ALL") dispatch(getDogs());
    dispatch(filterApi(e.target.value));
  };

  //Search bar
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onSearch = (search) => {
    console.log(search);
    try {
      dispatch(getDogsByName(search));
    } catch (error) {
      window.alert("hola");
    }

    setCurrentPage(1);
    setOrder(search);
  };

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="homeContainer">
        <nav>
          {/* searchbar */}
          <div className="search">
            <input
              className="searchBar"
              type="text"
              placeholder="search..."
              onChange={handleChangeSearch}
            />
            <button
              type="submit"
              className="searchButton"
              onClick={() => onSearch(search)}
              value={search}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>

          {/* Api or database */}
          <div className="apiDb">
            <select onChange={databaseChoiceHandler}>
              <option value="ALL">All▼</option>
              <option value="API">Api▼</option>
              <option value="DB">DB▼</option>
            </select>
          </div>

          {/* Filtros */}
          <div className="filters">
            <button
              className="filtersButton"
              value="asc"
              onClick={resetFilter}
              title="reset filters"
            >
              <i className="fa fa-filter"></i>
            </button>
          </div>
          <div className="filtersMenu">
            <select id="selectTemperaments" onChange={filterByTemperamentos}>
              <option value="0" key="0">
                Temperaments▼
              </option>
              {temperaments.map((element) => (
                <option
                  key={element.name}
                  value={element.id}
                  name={element.name}
                >
                  {element.id} - {element.name}
                </option>
              ))}
            </select>
            <a href="#" className="filterText" onClick={filterByNombre}>
              {Alfabetico}
            </a>
            <a href="#" className="filterText" onClick={filterByPeso}>
              {Peso}
            </a>
          </div>

          {/* Create button */}
          <Link to="/Home/create">
            <div className="agregarButton">
              <button type="submit" className="filtersButton" title="add dog">
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </Link>
        </nav>

        {/* Cards container */}
        <main>
          {dogs.slice((currentPage - 1) * 8, currentPage * 8).map((dog) => {
            if (dog.id.length > 5) {
              let minWeight = dog.weight.split(" - ")[0];
              let maxWeight = dog.weight.split(" - ")[1];
              return (
                <Card
                  key={dog.name}
                  id={dog.id}
                  name={dog.name}
                  image={dog.image}
                  temperaments={dog.temperaments}
                  minWeight={minWeight}
                  maxWeight={maxWeight}
                />
              );
            } else {
              return (
                <Card
                  key={dog.name}
                  id={dog.id}
                  name={dog.name}
                  image={dog.image}
                  temperaments={dog.temperament}
                  minWeight={dog.weight.minWeight}
                  maxWeight={dog.weight.maxWeight}
                />
              );
            }
          })}
        </main>

        {/* Footer */}
        <footer>
          <button className="leftButton" onClick={prevHandler}>
            <h3 className="buttonFont">Anterior</h3>
          </button>

          <button className="rightButton" onClick={nextHandler}>
            <h3 className="buttonFont">Siguiente</h3>
          </button>

          <h1 className="pagination">
            Page {currentPage} out of {max}
          </h1>

          <div className="temperamentsTags">
            {temperamentosDiv.map((e) => (
              <button
                className="temperamentWord"
                key={e}
                value={e}
                // onClick={deleteTemperaments}
              >
                {temperaments[e - 1]?.name},&nbsp;
              </button>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
