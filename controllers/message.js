const Message = require("../models/Message");
const io = require("../index").io;

exports.getUserMessages = async (req, res) => {
  try {
    const { _id } = req.user;
    const messages = await Message.find({ $or: [{ from: _id }, { to: _id }] });
    return res
      .status(200)
      .json({ success: true, messages, msg: "Fetched User Related Messages" });
  } catch (error) {
    res.json({ error, success: false });
  }
};

exports.createNewMessage = async (req, res) => {
  try {
    const { _id } = req.user;
    const message = await new Message({
      ...req.body,
      from: _id,
    }).save();
    io.emit("refreshMessages");
    return res
      .status(200)
      .json({ success: true, message, msg: "New Message Created" });
  } catch (error) {
    console.log(error);
    res.json({ error, success: false });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.deleteOne({ _id: id, from: req.user._id });
    io.emit("refreshMessages");
    return res.status(200).json({
      success: true,
      msg: `Deleted a count of ${message.deletedCount} message.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ error, success: false });
  }
};
