const { Schema, model } = require("mongoose");

const publicationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Pruebas", "Canción Propia", "Versión", "Otros"],
    required: true,
  },
  description: String,
  file: {
    type: String,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const PublicationModel = model("Publication", publicationSchema);

module.exports = PublicationModel;
