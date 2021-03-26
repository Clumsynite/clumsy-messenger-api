const router = require("express").Router();
// controllers
const user = require("../controllers/user.js");

router
  .get("/", user.onGetAllUsers)
  .post("/", user.onCreateUser)
  .get("/:id", user.onDeleteUserByUsername)
  .delete("/:id", user.onDeleteUserByUsername);

module.exports = router;
