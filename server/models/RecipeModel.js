const mongoose = require("mongoose");

const directionSchema = new mongoose.Schema({
  direction_description: String,
  direction_number: Number,
});

const ingredientSchema = new mongoose.Schema({
  food_id: String,
  food_name: String,
  ingredient_description: String,
  ingredient_url: String,
  measurement_description: String,
  number_of_units: mongoose.Schema.Types.Mixed, // Peut être un nombre ou une chaîne
  serving_id: String,
});

const recipeCategorySchema = new mongoose.Schema({
  recipe_category_name: String,
  recipe_category_url: String,
});

const recipeImageSchema = new mongoose.Schema({
  url: String,
});

const servingSchema = new mongoose.Schema({
  calcium: String,
  calories: String,
  carbohydrate: String,
  cholesterol: String,
  fat: String,
  fiber: String,
  iron: String,
  monounsaturated_fat: String,
  polyunsaturated_fat: String,
  potassium: String,
  protein: String,
  saturated_fat: String,
  serving_size: String,
  sodium: String,
  sugar: String,
  trans_fat: String,
  vitamin_a: String,
  vitamin_c: String,
});

const recipeSchema = new mongoose.Schema({
  cooking_time_min: String,
  directions: [directionSchema],
  grams_per_portion: String,
  ingredients: [ingredientSchema],
  number_of_servings: String,
  preparation_time_min: String,
  rating: String,
  recipe_categories: [recipeCategorySchema],
  recipe_description: String,
  recipe_id: String,
  recipe_images: [recipeImageSchema],
  recipe_name: String,
  recipe_types: {
    recipe_type: [String],
  },
  recipe_url: String,
  serving_sizes: [servingSchema],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
