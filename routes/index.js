const router = require("express").Router();
// controllers
const user = require("../controllers/user.js");
// middlewares
const { encode } = require("../middlewares/jwt.js");

router.post("/login/:userId", encode, (req, res, next) => {
  return res.status(200).json({
    success: true,
    authorization: req.authToken,
  });
});

export default router;
