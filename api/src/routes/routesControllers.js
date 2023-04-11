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
    let temperaments = await Temperament.findAll();

    dogs = dogs.map((breed) => {
      let weightArray = breed.weight.imperial.split(" - ");
      let temperamentArray = breed.temperament
        ? breed.temperament.split(", ").map((e) => {
            for (let i = 0; i < temperaments.length; i++) {
              if (e === temperaments[i].name) {
                return { id: temperaments[i].id, name: e };
              }
            }
          })
        : [];
      breed = {
        id: breed.id,
        image: breed.image.url,
        name: breed.name,
        height: breed.height,
        weight: { minWeight: weightArray[0], maxWeight: weightArray[1] },
        lifeSpan: breed.life_span,
        temperament: temperamentArray,
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
    `https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`
  );
  let dogs = await api.json();

  let dogsFiltered = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(name)
  );

  let temperaments = await Temperament.findAll();

  dogs = dogsFiltered.map((breed) => {
    let weightArray = breed.weight.imperial.split(" - ");
    let temperamentArray = breed.temperament
      ? breed.temperament.split(", ").map((e) => {
          for (let i = 0; i < temperaments.length; i++) {
            if (e === temperaments[i].name) {
              return { id: temperaments[i].id, name: e };
            }
          }
        })
      : [];
    breed = {
      id: breed.id,
      image: breed.image.url,
      name: breed.name,
      height: breed.height,
      weight: { minWeight: weightArray[0], maxWeight: weightArray[1] },
      lifeSpan: breed.life_span,
      temperament: temperamentArray,
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

  if (!dogs.length) throw Error(`No se ha encontrado la raza de perro ${name}`);
  return dogs;
};

const getDogById = async (id) => {
  if (id.length > 5) {
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

const postDog = async (image, name, height, weight, lifeSpan, temperament) => {
  const newDog = await Dog.create(
    {
      image,
      name,
      height,
      weight,
      lifeSpan,
    },
    { include: Temperament }
  );
  newDog.addTemperament(temperament);
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

    let set = new Set(temperamentsArray.map(JSON.stringify));
    let results = Array.from(set).map(JSON.parse);

    results = await Temperament.bulkCreate(results);

    console.log("primera iteracion!");
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
