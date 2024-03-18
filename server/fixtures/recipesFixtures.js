const publishRecipeCreated = require("../db/redis/subscribeOnCreateRecipe");
const mongoose = require("mongoose");
const Recipe = require("../models/RecipeModel");

const recipe = [
  {
    recipe_id: "91",
    recipe_name: "Poulet au curry",
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
    preparation_time_min: "15",
    cooking_time_min: "45",
    isFavorite: true,
    recipe_description:
      "Un délicieux poulet au curry, parfait pour un repas en famille.",
    recipe_picture: "upload/...",
    recipe_types: {
      recipe_type: ["Vege"],
    },
    created_by: "Hugo",
    created_at: new Date(),
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
