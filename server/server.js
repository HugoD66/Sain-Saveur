require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const initMongo = require("./db/mongoDB/mongoSetup");
const {
  getRecipe,
  getRecipes,
  addRecipe,
  removeRecipe,
  removeAllRecipes,
} = require("./calls/callRecipes");
const {
  getUser,
  getUsers,
  addUser,
  removeUser,
  removeAllUsers,
} = require("./calls/callUsers");
const cors = require("cors");

// FIXTURES
const insertRecipes = require("./fixtures/recipesFixtures");
const insertUsers = require("./fixtures/userFixtures");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser les données JSON dans les requêtes
app.use(bodyParser.json());
app.use(cors());

//-------------- GET ---------------- //
app.get("/api/user/:userId", getUser);
app.get("/api/users", getUsers);
app.get("/api/recipe/:recipeId", getRecipe);
app.get("/api/recipes", getRecipes);
//// -------------- POST ---------------- //
//app.post("/api/recipe", addRecipe);
app.post("/api/users", addUser);
//// -------------- DELETE ---------------- //
app.delete("/api/recipe/:recipeId", removeRecipe);
app.delete("/api/recipes", removeAllRecipes);
app.delete("/api/user/:userId", removeUser);
app.delete("/api/users", removeAllUsers);

// -------------- FIXTURES ---------------- //
app.post("/api/fixtures/users", async (req, res) => {
  try {
    const result = await insertUsers();
    console.log(result); // Log le résultat pour le débogage
    res.send({ message: "Utilisateurs ajoutés avec succès.", result: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Erreur lors de l'ajout des utilisateurs.",
      error: error.message,
    });
  }
});

app.post("/api/fixtures/recipes", (req, res) => {
  insertRecipes();
  res.send("Les recettes fixtures ont été insérées avec succès.");
});

//app.post("/api/fixtures/all", (req, res) => {
//  insertRecipes();
//  insertUsers();
//  res.send("Toutes les fixtures ont été insérées avec succès.");
//});

//db.serialize(async () => {
//Pour insérer des données au lancement serveur ( ça lance les fixtures )
//insertRecipes(db);
//insertUsers(db);
// Permet de !!!!!!!supprimer!!!!!!!! toutes les données au lancement du serveur
// Pas faire le/la con !
//removeAllReccipes();
//removeAllUsers();
//});

initMongo().catch(console.error);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
