const auth = require("../middlewares/auth");

const messagesController = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/addMessage/:id", auth, messagesController.addMessage);

router.post("/getAllMessages/:id", auth, messagesController.getAllMessages);

module.exports = router ;   