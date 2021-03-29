const User = require("../models/User");

exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const check = await User.findOne({ username });
    res.json({ exists: check === null ? false : true });
  } catch (error) {
    res.json({ error });
  }
};

exports.connectedUsers = async (req, res) => {
  try {
    const users = await User.find({ connected: true });
    res.json({
      msg: "Successfully retreived Cnnected User List",
      users,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
