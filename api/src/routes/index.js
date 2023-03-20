const { Router } = require("express");
const {
  getDogsByName,
  getDogById,
  postDog,
  getTemperaments,
} = require("./routesControllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  try {
    const dogs = await getDogsByName(name);
    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dog = await getDogById(id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/dogs", async (req, res) => {
  const { image, name, height, weight, lifeYears, temperament } = req.body;
  try {
    const newDog = await postDog(
      image,
      name,
      height,
      weight,
      lifeYears,
      temperament
    );
    res.status(200).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const temperaments = await getTemperaments();
    res.status(200).json(temperaments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
