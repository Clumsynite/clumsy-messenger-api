const router = require("express").Router();
// controllers
const user = require("../controllers/user.js");

router
  .get("/", user.onGetAllUsers)
  .post("/", user.onCreateUser)
  .get("/:id", user.onGetUserById)
  .delete("/:id", user.onDeleteUserById);

export default router;
