const auth = require("../middlewares/auth");

const userController = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/setAvatar/:id", auth, userController.setAvatar);

router.get("/users/:id", userController.getAllUsers)

module.exports = router ;   