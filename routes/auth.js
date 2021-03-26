const router = require("express").Router();
// controllers
const auth = require("../controllers/auth.js");
// middlewares
// const { encode } = require("../middlewares/jwt.js");

router.post("/login", auth.login);

module.exports = router;

