/*
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.SQLITE_DB, (err) => {
  if (err) {
    console.error(
      "Erreur lors de l'ouverture de la base de données",
      err.message,
    );
  } else {
    console.log("Connecté à la base de données SQLite.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Recette (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

module.exports = db;
*/
