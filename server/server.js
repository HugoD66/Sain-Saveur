const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const redisClient = require("./redisClient");
const recettes = require("./fixtures/recettesFixtures");
const users = require("./fixtures/userFixtures");

// J'ai mis ca car react vient d'un port différents.
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const db = new sqlite3.Database("database.db");

// Middleware pour parser les données JSON dans les requêtes
app.use(bodyParser.json());
app.use(cors());

// Création des tables dans la base de données
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY,
      email TEXT,
      username TEXT,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Recette (
      id INTEGER PRIMARY KEY,
      nom TEXT,
      sommeCal REAL,
      sommeLipide REAL,
      sommeGlucide REAL,
      sommeProteine REAL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Creation (
      idUser INTEGER,
      idRecette INTEGER,
      FOREIGN KEY (idUser) REFERENCES Users(id),
      FOREIGN KEY (idRecette) REFERENCES Recette(id),
      PRIMARY KEY (idUser, idRecette)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Ingredients (
      id INTEGER PRIMARY KEY,
      nom TEXT,
      calories REAL,
      lipide REAL,
      glucide REAL,
      proteine REAL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Appartenir (
      idRecette INTEGER,
      idIngredient INTEGER,
      FOREIGN KEY (idRecette) REFERENCES Recette(id),
      FOREIGN KEY (idIngredient) REFERENCES Ingredients(id),
      PRIMARY KEY (idRecette, idIngredient)
    )
  `);
});

// Exemple de point de terminaison pour récupérer toutes les recettes
app.get("/api/recettes", (req, res) => {
  db.all("SELECT * FROM Recette", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur interne du serveur");
    } else {
      console.log(`${rows.length} recettes récupérées avec succès`);
      res.json(rows);
    }
  });
});
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM Users", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur interne du serveur");
    } else {
      console.log(`${rows.length} utilisateurs récupérées avec succès`);
      res.json(rows);
    }
  });
});

// Exemple de point de terminaison pour ajouter une recette
app.post("/api/recettes", (req, res) => {
  const { nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine } = req.body;

  if (!nom || !sommeCal || !sommeLipide || !sommeGlucide || !sommeProteine) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  db.run(
    "INSERT INTO Recette (nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine) VALUES (?, ?, ?, ?, ?)",
    [nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur interne du serveur");
      } else {
        res.json({
          id: this.lastID,
          nom,
          sommeCal,
          sommeLipide,
          sommeGlucide,
          sommeProteine,
        });
      }
    },
  );
});

recettes.forEach((recette) => {
  const { nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine } = recette;
  const sql = `INSERT INTO Recette (nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine) VALUES (?, ?, ?, ?, ?)`;

  db.run(
    sql,
    [nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Recette ajoutée avec succès : ${this.lastID}`);
    },
  );
});
users.forEach((user) => {
  const { email, username, password } = user;
  const sql = `INSERT INTO Users (email, username, password) VALUES (?, ?, ?)`;

  db.run(sql, [email, username, password], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Utilisateur ajouté avec succès : ${this.lastID}`);
  });
});

/*
app.get("/api/redis/test", (req, res) => {
  // Logique pour utiliser Redis ou simplement renvoyer une réponse de test
  res.json({ message: "Réponse de test depuis l'endpoint /api/redis/test" });
});

 */

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
