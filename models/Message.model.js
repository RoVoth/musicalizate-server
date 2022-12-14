const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },

  publication: { type: Schema.Types.ObjectId, ref: "Publication" },

  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const MessageModel = model("Message", messageSchema);

module.exports = MessageModel;
