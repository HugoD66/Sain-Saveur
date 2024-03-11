const Recipe = require("../models/RecipeModel");
const redisClient = require("../db/redis/redisClient");
const User = require("../models/UserModel");
// ---------- GET ---------------- //

const getRecipe = async (req, res) => {
  try {
    const recipeId = req.params.userId;
    const user = await Recipe.findById(recipeId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Utilisateur non trouvé.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    console.log(`${recipes.length} recettes récupérées avec succès`);
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

// -------------- POST ---------------- //

const addRecipe = async (req, res) => {
  try {
    const recipeData = req.body;

    if (!recipeData.recipe_name || recipeData.ingredients.length === 0) {
      return res.status(400).json({
        error: "Des informations essentielles sur la recette manquent.",
      });
    }
    const newRecipe = new Recipe(recipeData);

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};
// ---------- REMOVE ---------------- //

const removeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const result = await Recipe.deleteOne({ _id: recipeId });
    if (result.deletedCount === 0) {
      return res.status(404).send("Utilisateur non trouvé.");
    }
    console.log(`Recette ${recipeId} supprimé avec succès`);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};
const removeAllRecipes = async (req, res) => {
  try {
    await Recipe.deleteMany({});
    console.log(`Toutes les recettes ont étées supprimés avec succès`);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

module.exports = {
  getRecipe,
  getRecipes,
  addRecipe,
  removeRecipe,
  removeAllRecipes,
};
