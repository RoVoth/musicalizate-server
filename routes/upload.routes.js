const router = require("express").Router();

const uploader = require("../middlewares/uploader");

// POST "/api/upload" => recibir una imagen del FE y enviarla a cloudinary. Enviar al FE el url de la imagen
router.post("/", uploader.single("media"), (req, res, next) => {
  // recibir el URL de Cloudinary como req.file.path

  if (req.file === undefined) {
    res.status(400).json({ errorMessage: "formato incorrecto/no hay archivo" });
    return;
  }

  res.json({ fileUrl: req.file.path });
});

module.exports = router;
