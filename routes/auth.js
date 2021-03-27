const router = require("express").Router();
// controllers
const auth = require("../controllers/auth.js");

router.post("/login", auth.login);
router.post("/logout", auth.logout);

module.exports = router;
