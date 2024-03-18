const Recipe = require("../models/RecipeModel");
const publishRecipeCreated = require("../db/redis/subscribeOnCreateRecipe");
// ---------- GET ---------------- //

const getRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id;
    const user = await Recipe.findById(recipeId).populate("recipe_type");
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
    const recipes = await Recipe.find({}).populate("recipe_type");
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

    if (req.file) {
      console.log(`Photo téléchargée à l'emplacement : ${req.file.path}`);
      recipeData.recipe_picture = req.file.path;
    }

    const newRecipe = new Recipe(recipeData);
    const savedRecipe = await newRecipe.save();

    console.log("newrecipe");
    console.log(newRecipe);
    console.log("savedrecipe");
    console.log(savedRecipe);
    res.status(201).json(savedRecipe);
    await publishRecipeCreated(savedRecipe.recipe_name);
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
      return res.status(404).send("Recette non trouvée.");
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
const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const updateData = req.body;

    // La méthode findByIdAndUpdate prend l'ID de la recette, les données de mise à jour,
    // et un objet d'options où new: true retourne le document mis à jour.
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateData, {
      new: true,
      runValidators: true, // Cela permet d'appliquer les validations définies dans le schéma
    });

    if (!updatedRecipe) {
      return res.status(404).send("Recette non trouvée.");
    }

    console.log(`Recette ${recipeId} mise à jour avec succès`);
    res.json(updatedRecipe);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).send("Validation Error");
    }
    res.status(500).send("Erreur interne du serveur");
  }
};

module.exports = {
  getRecipe,
  getRecipes,
  addRecipe,
  updateRecipe,
  removeRecipe,
  removeAllRecipes,
};
