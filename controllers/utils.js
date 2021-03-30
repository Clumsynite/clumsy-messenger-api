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
    const users = await User.find({
      connected: true,
      username: { $ne: req.user.username },
    });
    res.json({
      msg: "Successfully retreived Cnnected User List",
      users,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ error, success: false });
  }
};

exports.otherUsers = async (req, res) => {
  try {
    const users = await User.find({
      username: { $ne: req.user.username },
    });
    users.map((doc) => {
      const { _doc } = doc;
      _doc.con = _doc.connected ? 1 : 0;
    });
    res.json({
      msg: "Successfully retreived Cnnected User List",
      users,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ error, success: false });
  }
};
