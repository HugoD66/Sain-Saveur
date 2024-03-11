const publishRecipeCreated = require("../db/redis/subscribeOnCreateRecipe");
const mongoose = require("mongoose");
const Recipe = require("../models/RecipeModel");

const recipe = [
  {
    recipe_name: "Poulet au curry",
    ingredients: [
      {
        food_name: "Poulet",
        ingredient_description: "1 poulet entier",
        ingredient_url: "https://example.com/poulet",
        measurement_description: "unité",
        number_of_units: "1",
        serving_id: "12345",
      },
      {
        food_name: "Curry",
        ingredient_description: "2 cuillères à soupe de poudre de curry",
        ingredient_url: "https://example.com/curry",
        measurement_description: "cuillère à soupe",
        number_of_units: "2",
        serving_id: "67890",
      },
    ],
    directions: [
      {
        direction_description: "Préchauffez votre four à 180°C.",
        direction_number: 1,
      },
      {
        direction_description:
          "Mélangez le poulet avec le curry et faites cuire au four pendant 45 minutes.",
        direction_number: 2,
      },
    ],
    grams_per_portion: "194.225",
    number_of_servings: "4",
    preparation_time_min: "15",
    cooking_time_min: "45",
    rating: "4",
    recipe_categories: [
      {
        recipe_category_name: "Plat principal",
        recipe_category_url: "https://example.com/plat_principal",
      },
    ],
    recipe_description:
      "Un délicieux poulet au curry, parfait pour un repas en famille.",
    recipe_id: "91",
    recipe_images: [
      {
        url: "https://example.com/poulet_curry.jpg",
      },
    ],
    recipe_url: "https://example.com/recette_poulet_curry",
    serving_sizes: [
      {
        calcium: "6%",
        calories: "177",
        carbohydrate: "2.23g",
        cholesterol: "63mg",
        fat: "2.32g",
        fiber: "0.6g",
        iron: "3%",
        monounsaturated_fat: "0.436g",
        polyunsaturated_fat: "0.788g",
        potassium: "752mg",
        protein: "35.10g",
        saturated_fat: "0.490g",
        serving_size: "1 portion",
        sodium: "692mg",
        sugar: "0.58g",
        trans_fat: "0g",
        vitamin_a: "8%",
        vitamin_c: "32%",
      },
    ],
    recipe_types: {
      recipe_type: ["Main Dish"],
    },
  },
];

async function insertRecipes() {
  try {
    const createdRecipes = await Recipe.insertMany(recipe);
    console.log(`Recettes ajoutées avec succès: ${createdRecipes.length}`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout des recettes:`, error);
  }
}
module.exports = insertRecipes;
