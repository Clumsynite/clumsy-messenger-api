const router = require("express").Router();
const utilsController = require("../controllers/utils");

router.get("/check-username/:username", utilsController.checkUsername);
router.get("/users-connected/", utilsController.connectedUsers);

module.exports = router;
