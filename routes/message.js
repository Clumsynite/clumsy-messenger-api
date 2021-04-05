const router = require("express").Router();
const messageController = require("../controllers/message");

const { decode } = require("../middlewares/jwt");

router.get("/", decode, messageController.getUserMessages);
router.post("/new", decode, messageController.createNewMessage);
router.delete("/:id", decode, messageController.deleteMessage);

module.exports = router;
