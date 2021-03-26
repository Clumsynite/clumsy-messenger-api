const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

exports.onGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res
      .status(200)
      .json({ success: true, users, msg: "Successfully retreived User List" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
exports.onGetUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    return res
      .status(200)
      .json({ success: true, user, message: `${username}'s data retreived` });
  } catch (error) {
    console.error("User controller | onGetUserByUsername | Error: ", error);
    return res.status(500).json({ success: false, error });
  }
};
exports.onCreateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(500).json({
        error: "User already exists. Try a different username",
        success: false,
      });
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();

    return res
      .status(200)
      .json({ success: true, user, msg: "Signup Successful" });
  } catch (error) {
    console.error("User controller | onCreateUser | Error: ", error);
    return res.status(500).json({ success: false, error });
  }
};
exports.onDeleteUserByUsername = async (req, res) => {
  try {
    const user = await User.deleteOne({ username });
    return res.status(200).json({
      success: true,
      message: `Deleted a count of ${user.deletedCount} user.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
