const mongoose = require("mongoose");

const directionSchema = new mongoose.Schema({
  direction_description: String,
  direction_number: Number,
});

const recipeSchema = new mongoose.Schema({
  recipe_id: String,
  recipe_name: String,
  directions: [directionSchema],
  preparation_time_min: String,
  cooking_time_min: String,
  isFavorite: Boolean,
  recipe_description: String,
  recipe_picture: String,
  recipe_types: {
    recipe_type: [String],
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
