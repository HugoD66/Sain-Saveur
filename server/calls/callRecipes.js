const db = require("../db/dbSetup");
const redisClient = require("../db/redis/redisClient");
// ---------- GET ---------------- //

const getRecipe = (req, res) => {
  const recipeId = req.params.recipeId;
  const sql = `SELECT * FROM Recette WHERE id = ?`;
  db.get(sql, [recipeId], (err, row) => {
    if (err) {
      res.status(500).send("Erreur interne du serveur");
      console.error(err.message);
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send("Recette non trouvé.");
    }
  });
};

const getRecipes = (req, res) => {
  db.all("SELECT * FROM Recette", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur interne du serveur");
    } else {
      console.log(`${rows.length} recettes récupérées avec succès`);
      res.json(rows);
    }
  });
};

// -------------- POST ---------------- //
const addRecipe = (req, res) => {
  const { nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine } = req.body;

  if (!nom || !sommeCal || !sommeLipide || !sommeGlucide || !sommeProteine) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const sql =
    "INSERT INTO Recette (nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine) VALUES (?, ?, ?, ?, ?)";

  db.run(
    sql,
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
};

// ---------- REMOVE ---------------- //
const removeRecipe = (req, res) => {
  const recipeId = req.params.recipeId;
  const sql = `DELETE FROM Recette WHERE id = ?`;
  db.run(sql, [recipeId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur interne du serveur");
    } else {
      res.status(200).send("Recette supprimée avec succès");
    }
  });
};
const removeAllRecipes = (req, res) => {
  db.run("DELETE FROM Recette", (err) => {
    if (err) {
      console.error(err);
      if (res) res.status(500).send("Erreur interne du serveur");
    } else {
      console.log(`Toutes les recettes ont été supprimées avec succès`);
    }
  });
};

module.exports = {
  getRecipe,
  getRecipes,
  addRecipe,
  removeRecipe,
  removeAllRecipes,
};
