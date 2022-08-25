const router = require("express").Router();
const MessageModel = require("../models/Message.model");
const UserModel = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

//POST crear comentario
router.post("/:publicationId", isAuthenticated, async (req, res, next) => {
  const { publicationId } = req.params;
  const { text } = req.body;
  const foundUser = await UserModel.findOne({ _id: req.payload._id });
  console.log("foundUser", foundUser);

  try {
    await MessageModel.create({
      owner: req.payload._id,
      username: foundUser.username,
      publication: publicationId,
      text: text,
    });
    res.json("mensaje creado");
  } catch (error) {
    next(error);
  }
});

//GET mostrar comentario

router.get("/:messageId", isAuthenticated, async (req, res, next) => {
  const { messageId } = req.params;
  console.log(messageId);
  try {
    const messagePublication = await MessageModel.find({
      publication: messageId,
    });
    res.json(messagePublication);
  } catch (error) {
    next(error);
  }
});

//DELETE comentario

router.delete("/:messageId", isAuthenticated, async (req, res, next) => {
  try {
    await MessageModel.findOneAndDelete(
      { owner: req.payload._id },
      { _id: req.params._id }
    );

    res.json("mensaje borrado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
