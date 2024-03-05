const express = require("express");
const bodyParser = require("body-parser");
const db = require("../server/db/dbSetup");
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

/// A BOUGER
const redisClient = require("./redisClient");

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
// -------------- POST ---------------- //
app.post("/api/recipe", addRecipe);
app.post("/api/users", addUser);
// -------------- DELETE ---------------- //
app.delete("/api/recipe/:recipeId", removeRecipe);
app.delete("/api/recipes", removeAllRecipes);
app.delete("/api/user/:userId", removeUser);
app.delete("/api/users", removeAllUsers);

db.serialize(() => {
  //Pour insérer des données au lancement serveur ( ça lance les fixtures )
  //insertRecipes(db);
  //insertUsers(db);
  // Permet de !!!!!!!supprimer!!!!!!!! toutes les données au lancement du serveur
  // Pas faire le/la con !
  //removeAllReccipes();
  //removeAllUsers();
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
