const Recipe = require("../models/RecipeModel");
const publishRecipeCreated = require("../db/redis/subscribeOnCreateRecipe");
const { findById } = require("../models/TypeModel");
const Type = require("../models/TypeModel");
// ---------- GET ---------------- //

const getRecipesByIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.ingredientId;

    const recipes = await Recipe.find({
      recipe_ingredients: ingredientId,
    })
      .populate("recipe_ingredients")
      .populate("recipe_types");

    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(404).send("Aucune recette trouvée avec cet ingrédient.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
const getRecipesByType = async (req, res) => {
  try {
    const typeId = req.params.typeId;

    const recipes = await Recipe.find({
      recipe_types: typeId,
    })
      .populate("recipe_ingredients")
      .populate("recipe_types");

    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(404).send("Aucune recette trouvée avec cet ingrédient.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
const getRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    const recipe = await Recipe.findById(recipeId)
      .populate("recipe_types")
      .populate("recipe_ingredients");

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).send("Recette non trouvé.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
      .populate("recipe_types")
      .populate("recipe_ingredients");
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
    let recipeData = req.body;
    console.log("RecipeDetail Data , à l'arrivé du formulaire");
    console.log(req.body);

    if (typeof recipeData.recipe_directions === "string") {
      recipeData.recipe_directions = JSON.parse(recipeData.recipe_directions);
    }
    if (typeof recipeData.recipe_ingredients === "string") {
      recipeData.recipe_ingredients = JSON.parse(recipeData.recipe_ingredients);
    }
    console.log("recipeData parsé DIRECTIONS : ");
    console.log(recipeData.recipe_directions);

    // Traitement de l'image
    if (req.file) {
      console.log(`Photo téléchargée à l'emplacement : ${req.file.path}`);
      recipeData.recipe_picture = req.file.path;
    }

    // Conversion de recipe_types en un tableau d'ObjectId
    if (!Array.isArray(recipeData.recipe_types)) {
      recipeData.recipe_types = [recipeData.recipe_types];
    }
    recipeData.recipe_ingredients = Array.isArray(recipeData.recipe_ingredients)
      ? recipeData.recipe_ingredients
      : [recipeData.recipe_ingredients];

    for (const typeId of recipeData.recipe_types) {
      const typeExists = await Type.findById(typeId);
      if (!typeExists) {
        return res
          .status(400)
          .send(`Type de recette non trouvé pour l'ID : ${typeId}`);
      }
    }

    const newRecipe = new Recipe({
      ...recipeData,
      directions: recipeData.recipe_directions || [],
    });
    const savedRecipe = await newRecipe.save();

    console.log("Nouvelle recette créée avec succès");
    res.status(201).json(savedRecipe);

    //Appel Redis !
    //await publishRecipeCreated(savedRecipe);
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
  getRecipesByType,
  getRecipesByIngredient,
};
