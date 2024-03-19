const express = require("express");
const router = express.Router();
const insertRecipes = require("../fixtures/recipesFixtures");
const insertUsers = require("../fixtures/userFixtures");
const insertTypes = require("../fixtures/typesFixtures");
const insertIngredients = require("../fixtures/ingredientsFixtures");

router.post("/recipes", async (req, res) => {
  try {
    await insertRecipes();
    res.send("Les recettes fixtures ont été insérées avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'insertion des recettes fixtures.");
  }
});

router.post("/users", async (req, res) => {
  try {
    await insertUsers();
    res.send("Les utilisateurs fixtures ont été insérés avec succès.");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Erreur lors de l'insertion des utilisateurs fixtures.");
  }
});

router.post("/types", async (req, res) => {
  try {
    await insertTypes();
    res.send("Les types de recettes ont été insérés avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'insertion des types de recettes.");
  }
});

router.post("/ingredients", async (req, res) => {
  try {
    await insertIngredients();
    res.send("Les ingredients  ont été insérés avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'insertion des ingredients.");
  }
});

router.post("/all", async (req, res) => {
  try {
    await insertRecipes();
    await insertUsers();
    await insertTypes();
    res.send("Toutes les fixtures ont été insérées avec succès.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'insertion de toutes les fixtures.");
  }
});

module.exports = router;
