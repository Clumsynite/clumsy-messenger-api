const router = require("express").Router();
// controllers
const user = require("../controllers/user.js");
const { decode } = require("../middlewares/jwt");

router
  .get("/", user.onGetAllUsers)
  .post("/", user.onCreateUser)
  .put("/", decode, user.onUpdateUser)
  .get("/:id", user.onDeleteUserByUsername)
  .delete("/:id", decode, user.onDeleteUserByUsername);

module.exports = router;
