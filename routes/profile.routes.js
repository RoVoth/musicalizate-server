const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const PublicationModel = require("../models/Publication.model");

//GET

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    await PublicationModel.find({ owner: req.payload._id });
    res.json("pagina de perfil");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
