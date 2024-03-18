const Recipe = require("../models/RecipeModel");
const publishRecipeCreated = require("../db/redis/subscribeOnCreateRecipe");
const { findById } = require("../models/TypeModel");
const Type = require("../models/TypeModel");
// ---------- GET ---------------- //

const getRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id;
    console.log(recipe);
    const recipe = await Recipe.findById(recipeId).populate("recipe_types");
    console.log(recipe);

    if (recipe) {
      res.json(recipe);
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
    const recipes = await Recipe.find({}).populate("recipe_types");
    console.log(`${recipes.length} recettes récupérées avec succès`);
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

// -------------- POST ---------------- //

/*const addRecipe = async (req, res) => {
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
};*/
const addRecipe = async (req, res) => {
  try {
    let recipeData = req.body;

    // Traitement de l'image, si présente
    if (req.file) {
      console.log(`Photo téléchargée à l'emplacement : ${req.file.path}`);
      recipeData.recipe_picture = req.file.path;
    }

    // Conversion de recipe_types en un tableau d'ObjectId s'il ne l'est pas déjà
    if (!Array.isArray(recipeData.recipe_types)) {
      recipeData.recipe_types = [recipeData.recipe_types];
    }

    // Vérification de l'existence des types de recettes
    for (const typeId of recipeData.recipe_types) {
      const typeExists = await Type.findById(typeId);
      if (!typeExists) {
        return res
          .status(400)
          .send(`Type de recette non trouvé pour l'ID : ${typeId}`);
      }
    }

    // Ajout des directions si présentes
    if (recipeData.directions && Array.isArray(recipeData.directions)) {
      recipeData.directions = recipeData.directions.map((dir, index) => ({
        direction_description: dir.direction_description,
        direction_number: index + 1,
      }));
    } else {
      recipeData.directions = [];
    }

    const newRecipe = new Recipe(recipeData);
    const savedRecipe = await newRecipe.save();

    console.log("Nouvelle recette créée avec succès");
    res.status(201).json(savedRecipe);
    await publishRecipeCreated(savedRecipe.recipe_name);
  } catch (err) {
    console.error("Erreur lors de l'ajout de la recette:", err);
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
