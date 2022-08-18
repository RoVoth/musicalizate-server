const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");

const isAuthenticated = require("../middlewares/isAuthenticated");

//POST SIGNUP REGISTRO
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  //VALIDAR (RELLENAR CAMPOS)
  if (!username || !email || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" });
    return;
  }
  // Validas Contraseña
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passwordRegex.test(password) === false) {
    res.json({
      errorMessage:
        "Contraseña no valida, debes tener 8 caracteres, 1 letra, 1 numero",
    });
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
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  //VALIDAR (RELLENAR CAMPOS)
  if (!email || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" });
    return;
  }

  try {
    const foundUser = await UserModel.findOne({ email: email });
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Usuario no registrado" });
      return;
    }

    //VALIDAR CONTRASEÑA
    const isPasswordValid = await bcryptjs.compare(
      password,
      foundUser.password
    );
    console.log("isPasswordValid", isPasswordValid);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Contraseña no valida" });
      return;
    }
    // Usuario Validado

    //crear payload
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    // generar token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

//GET verify
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("verificando token");
  console.log(req.payload);

  res.json(req.payload);
});

module.exports = router;
