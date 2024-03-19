const Ingredient = require("../models/IngredientModel");

// ------------ GET -------------//

const getIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.ingredient_id;
    const ingredient = await Ingredient.findById({ ingredientId });
    if (ingredient) {
      res.json(ingredient);
    }
  } catch (err) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.json(ingredients);
  } catch (err) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

// ------------ POST -------------//

const addIngredient = async (req, res) => {
  try {
    const ingredientData = req.body;
    const newIngredient = new Ingredient(ingredientData);
    const savedIngredient = await newIngredient.save();
    res.status(201).json(savedIngredient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

// ------------ REMOVE -------------//

const removeIngredient = async (req, res) => {
  try {
    const ingredientId = req.params.ingredientId;
    const result = await Ingredient.deleteOne({ _id: ingredientId });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

const removeIngredients = async (req, res) => {
  try {
    const result = await Ingredient.deleteMany({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};
