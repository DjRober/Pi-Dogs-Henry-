const GET_ALL_DOGS = "GET_ALL_DOGS";
const GET_DOG_BY_ID = "GET_DOG_BY_ID";
const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
const POST_DOG = "POST_DOG";
const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
const FILTER_BY_NAME = "FILTER_BY_NAME";
const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
const ERROR = "ERROR";
const FILTER_API = "FILTER_API";

const getDogs = () => {
  return async (dispatch) => {
    const api = await fetch("http://localhost:3001/dogs");
    let dogs = await api.json();
    dispatch({ type: GET_ALL_DOGS, payload: dogs });
  };
};

const getTemperaments = () => {
  return async (dispatch) => {
    const api = await fetch("http://localhost:3001/temperaments");
    let temperaments = await api.json();
    dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
  };
};

const getDogsByName = (name) => async (dispatch) => {
  try {
    const api = await fetch(`http://localhost:3001/dogs?name=${name}`);
    let dogs = await api.json();
    if (dogs.error) throw Error;
    dispatch({ type: GET_DOGS_BY_NAME, payload: dogs });
  } catch (error) {
    return alert("Raza no encontrada");
  }
};

const getDogById = (id) => {
  return async (dispatch) => {
    const api = await fetch(`http://localhost:3001/dogs/${id}`);
    let dog = await api.json();
    dispatch({ type: GET_DOG_BY_ID, payload: dog });
  };
};

const postDog = (value) => {
  value = {
    name: value.name,
    image: value.image,
    height: value.minHeight + " - " + value.maxHeight,
    weight: value.minWeight + " - " + value.maxWeight,
    lifeSpan: parseInt(value.lifeSpan),
    temperament: value.temperaments,
  };

  console.log(value);
  return async (dispatch) => {
    const api = await fetch("http://localhost:3001/dogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    let dog = await api.json();
    dispatch({ type: POST_DOG, payload: dog });
  };
};

const filterApi = (payload) => {
  return {
    type: FILTER_API,
    payload,
  };
};

const filterByTemperaments = (payload) => {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
};

const filterByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
};

const filterByWeight = (payload) => {
  return {
    type: FILTER_BY_WEIGHT,
    payload,
  };
};

module.exports = {
  GET_ALL_DOGS,
  GET_DOG_BY_ID,
  GET_TEMPERAMENTS,
  GET_DOGS_BY_NAME,
  POST_DOG,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_NAME,
  FILTER_BY_WEIGHT,
  ERROR,
  FILTER_API,
  filterApi,
  getDogs,
  getDogById,
  getTemperaments,
  getDogsByName,
  postDog,
  filterByTemperaments,
  filterByName,
  filterByWeight,
};
