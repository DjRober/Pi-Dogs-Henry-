const { Dog, Temperament } = require("../db");
const { APIKEY } = process.env;
const { Op } = require("sequelize");

const getDogsByName = async (name) => {
  //Sin name
  if (!name) {
    const api = await fetch(
      `https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`
    );
    let dogs = await api.json();

    dogs = dogs.map((breed) => {
      breed = {
        id: breed.id,
        image: breed.image,
        name: breed.name,
        height: breed.height,
        weight: breed.weight,
        lifeSpan: breed.life_span,
        temperament: breed.temperament,
      };
      return breed;
    });

    let dogsDatabase = await Dog.findAll({
      include: Temperament,
    });
    if (dogsDatabase.length != 0) dogs = [...dogsDatabase, ...dogs];

    return dogs;
  }

  //Con name
  name = name.toLowerCase();

  const api = await fetch(
    `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${APIKEY}`
  );
  let dogs = await api.json();

  dogs = dogs.map((breed) => {
    breed = {
      id: breed.id,
      image: breed.image,
      name: breed.name,
      height: breed.height,
      weight: breed.weight,
      lifeSpan: breed.life_span,
      temperament: breed.temperament,
    };
    return breed;
  });

  let dogsDatabase = await Dog.findAll({
    include: Temperament,
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (dogsDatabase.length != 0) dogs = [...dogsDatabase, ...dogs];

  return dogs;
};

const getDogById = async (id) => {
  if (typeof id == "string") {
    let dogDatabase = await Dog.findByPk(id, {
      include: Temperament,
    });

    return dogDatabase;
  }

  const api = await fetch(
    `https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`
  );
  let dogs = await api.json();
  const dog = dogs.filter((breed) => breed.id == id);
  return dog;
};

const postDog = async (image, name, height, weight, lifeYears) => {
  const newDog = await Dog.create({
    image,
    name,
    height,
    weight,
    lifeYears,
  });
  return newDog;
};

const getTemperaments = async () => {
  let temperamets = await Temperament.findAll();

  if (!temperamets.length) {
    const api = await fetch(
      `https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`
    );
    let dogs = await api.json();

    let temperamentsArray = [];
    dogs.forEach((dog) => {
      let str;
      dog.temperament ? (str = dog.temperament.split(", ")) : (str = []);
      str.forEach((element) => {
        temperamentsArray.push({ name: element });
      });
    });

    // let results = temperamentsArray.filter(
    //   (temperament, i) => temperamentsArray.indexOf(temperament) === i
    // );

    // const temperamentsFiltered = new Set(temperamentsArray);
    // var results = [...temperamentsFiltered];

    let set = new Set(temperamentsArray.map(JSON.stringify));
    let results = Array.from(set).map(JSON.parse);

    results = await Temperament.bulkCreate(results);

    console.log("primera iteracion!");
    console.log(temperamets);
    return results;
  }

  console.log("segunda iteracion");
  return temperamets;
};

module.exports = {
  getDogsByName,
  getDogById,
  postDog,
  getTemperaments,
};
