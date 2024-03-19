const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ingredient_id: { type: String, required: true },
  ingredient_name: String,
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
