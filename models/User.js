const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    username: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    connected: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
