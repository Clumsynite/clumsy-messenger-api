const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const messageSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    from: { type: Schema.Types.ObjectId, required: true },
    to: { type: Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    added: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "messages",
  }
);

module.exports = mongoose.model("Message", messageSchema);
