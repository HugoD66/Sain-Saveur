const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  type_id: String,
  name: { type: String, required: true },
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
