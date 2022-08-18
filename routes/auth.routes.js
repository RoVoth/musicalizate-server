const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");

//POST SIGNUP REGISTRO
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  //VALIDAR (RELLENAR CAMPOS)
  if (!username || !email || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" });
    return;
  }

  try {
    const foundUser = await UserModel.findOne({ email: email });
    console.log(foundUser);
    if (foundUser !== null) {
      res
        .status(400)
        .json({ errorMessage: "Ya existe un usuario con ese email" });
      return;
    }
    //ENCRIPTAR CONTRAÑA
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // crear usuario BD
    await UserModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

//POST LOGIN VERIFICAR USUARIO

//VALIDAR (RELLENAR CAMPOS)

//VALIDAR CONTRASEÑA

//GET CHEKA EL TOKEN (USUARIO VALIDO)

module.exports = router;
