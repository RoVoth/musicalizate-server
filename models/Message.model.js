const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  owner: { type: Schema.Types.ObjetId, ref: "User" },

  publication: { type: Schema.Types.ObjetId, ref: "Publication" },

  text: {
    type: String,
    required: true,
  },
});

const MessageModel = model("message", messageSchema);

module.exports = MessageModel;
