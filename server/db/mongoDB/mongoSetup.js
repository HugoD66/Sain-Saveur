const mongoose = require("mongoose");
const insertRecipes = require("../../fixtures/recipesFixtures");

async function initMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mongo-data", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await insertRecipes();

    console.log("Connecté à MongoDB avec succès.");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
  }
}

module.exports = initMongo;
