const router = require("express").Router();
const utilsController = require("../controllers/utils");

const { decode } = require("../middlewares/jwt");

router.get("/check-username/:username", utilsController.checkUsername);
router.get("/users-connected/", decode, utilsController.connectedUsers);
router.get("/users-other", decode, utilsController.otherUsers)

module.exports = router;
