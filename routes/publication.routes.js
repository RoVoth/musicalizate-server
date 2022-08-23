const router = require("express").Router();
const PublicationModel = require("../models/Publication.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

// AQUI VAN TODAS LAS RUTAS

//GET
router.get("/personalPublication", isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.payload._id);
    const allPublicationTitles = await PublicationModel.find({
      owner: req.payload._id,
    }).select("title");
    res.json(allPublicationTitles);
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const allPublicationTitles = await PublicationModel.find().select("title");
    res.json(allPublicationTitles);
  } catch (error) {
    next(error);
  }
});

//POST
router.post("/", isAuthenticated, async (req, res, next) => {
  const { title, category, description, file } = req.body;
  console.log(req.body);
  if (!title || !category || !description || !file) {
    res.json({ errorMessage: "campos no completados" });
  }
  try {
    const newPublication = await PublicationModel.create({
      title: title,
      category: category,
      description: description,
      file: file,
      owner: req.payload._id,
    });
    res.json(newPublication);
  } catch (error) {
    next(error);
  }
});

//GET

router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    const singlePublication = await PublicationModel.findById(id);
    res.json(singlePublication);
  } catch (error) {
    next(error);
  }
});

//DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    await PublicationModel.findByIdAndDelete(req.params.id);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

//PATCH
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, category, description, file } = req.body;

  if (!title || !category || !description || !file) {
    res.json({ errorMessage: "Campos no completados" });
  }

  try {
    await PublicationModel.findByIdAndUpdate(id, {
      title: title,
      category: category,
      description: description,
      file: file,
    });
    res.json("Publicacion Actualizada");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
