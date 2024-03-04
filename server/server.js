const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const redisClient = require("./redisClient");
const db = require("../server/db/dbSetup");
const recettes = require("./fixtures/recettesFixtures");
const users = require("./fixtures/userFixtures");
const { getRecettes, getUsers, addRecette } = require("./calls/call");
const cors = require("cors");

// FIXTURES
const insertRecettes = require("./fixtures/recettesFixtures");
const insertUsers = require("./fixtures/userFixtures");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser les données JSON dans les requêtes
app.use(bodyParser.json());
app.use(cors());

//-------------- GET ---------------- //
app.get("/api/recettes", getRecettes);
app.get("/api/users", getUsers);

// -------------- POST ---------------- //
app.post("/api/recettes", addRecette);

db.serialize(() => {
  insertRecettes(db);
  insertUsers(db);
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
