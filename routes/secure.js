const router = require("express").Router();
// controllers
// const auth = require("../controllers/auth.js");
// middlewares
const { decode } = require("../middlewares/jwt.js");

router.get("/access", decode, (req, res) => {
  console.log("REQ USER", res.locals.user)
  return res.status(200).json({ success: true, msg: "Accessed secure route " });
});

module.exports = router;
