const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const publicationRoutes = require("./publication.routes");
router.use("/publication", publicationRoutes);

const messageRoutes = require("./message.routes");
router.use("/message", messageRoutes);

module.exports = router;
