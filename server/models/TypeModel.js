const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  type_id: { type: String, required: true, unique: true },
  type_name: String,
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
