import {
  GET_ALL_DOGS,
  GET_DOG_BY_ID,
  GET_TEMPERAMENTS,
  GET_DOGS_BY_NAME,
  POST_DOG,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_NAME,
  FILTER_BY_WEIGHT,
  FILTER_API,
} from "./action";

const inicialState = {
  allDogs: [],
  allDogsBackUp: [],
  allTemperaments: [],
  detailDog: [],
};

const reducer = (state = inicialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        allDogsBackUp: action.payload,
      };
    case GET_DOG_BY_ID:
      return {
        ...state,
        detailDog: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: action.payload,
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };
    case FILTER_BY_TEMPERAMENTS:
      let filteredDogs = state.allDogs.filter((e) => {
        if (e.id.length > 5) {
          for (let i = 0; i < e.temperaments.length; i++) {
            if (e.temperaments[i].id == action.payload) {
              return true;
            }
          }
          return false;
        } else {
          for (let i = 0; i < e.temperament.length; i++) {
            if (e.temperament[i].id == action.payload) {
              return true;
            }
          }
          return false;
        }
      });
      return {
        ...state,
        allDogs: filteredDogs,
      };

    case POST_DOG:
      alert("Perro creado exitosamente");
      return {
        ...state,
        allDogs: [...state.allDogs, action.payload],
      };

    case FILTER_BY_NAME:
      let filterArray =
        action.payload === "asc"
          ? state.allDogs.sort(function (a, b) {
              if (a.name === b.name) return 0;
              if (a.name < b.name) return -1;
              return 1;
            })
          : state.allDogs.sort(function (a, b) {
              if (a.name === b.name) return 0;
              if (a.name > b.name) return -1;
              return 1;
            });
      return {
        ...state,
        allDogs: filterArray,
      };
    case FILTER_BY_WEIGHT:
      let filterArray2 =
        action.payload === "asc"
          ? state.allDogs.sort(function (a, b) {
              const aMinWeight =
                a.id.length > 5 ? a.weight.split(" - ")[0] : a.weight.minWeight;
              const bMinWeight =
                b.id.length > 5 ? b.weight.split(" - ")[0] : b.weight.minWeight;

              if (parseInt(aMinWeight) === parseInt(bMinWeight)) return 0;
              if (parseInt(aMinWeight) < parseInt(bMinWeight)) return -1;
              return 1;
            })
          : state.allDogs.sort(function (a, b) {
              const aMinWeight =
                a.id.length > 5 ? a.weight.split(" - ")[0] : a.weight.minWeight;
              const bMinWeight =
                b.id.length > 5 ? b.weight.split(" - ")[0] : b.weight.minWeight;

              if (parseInt(aMinWeight) === parseInt(bMinWeight)) return 0;
              if (parseInt(aMinWeight) > parseInt(bMinWeight)) return -1;
              return 1;
            });
      return {
        ...state,
        allDogs: filterArray2,
      };
    case FILTER_API:
      switch (action.payload) {
        case "ALL":
          return {
            ...state,
          };
        case "API":
          let filterDogsApi = state.allDogsBackUp.filter(
            (e) => e.id.toString().length < 5
          );
          return {
            ...state,
            allDogs: filterDogsApi,
          };
        case "DB":
          let filterDogsDb = state.allDogsBackUp.filter(
            (e) => e.id.toString().length > 5
          );
          return {
            ...state,
            allDogs: filterDogsDb,
          };
      }
      break;

    default:
      return { ...state };
  }
};

export default reducer;
