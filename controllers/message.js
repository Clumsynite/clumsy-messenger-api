const Message = require("../models/Message");

exports.getUserMessages = async (req, res) => {
  try {
    const { _id } = req.user;
    const messages = await Message.find({ $or: [{ from: _id }, { to: _id }] });
    return res
      .status(200)
      .json({ success: true, messages, msg: "Fetched User Related Messages" });
  } catch (error) {
    res.json({ error });
  }
};

exports.createNewMessage = async (req, res) => {
  try {
    const message = await new Message({
      ...req.body,
    }).save();
    return res
      .status(200)
      .json({ success: true, message, msg: "New Message Created" });
  } catch (error) {
    console.log(error);
    res.json({ error, success: false });
  }
};