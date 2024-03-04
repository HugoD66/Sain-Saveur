const db = require("../db/dbSetup");

const getRecettes = (req, res) => {
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

const getUsers = (req, res) => {
  db.all("SELECT * FROM Users", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur interne du serveur");
    } else {
      console.log(`${rows.length} utilisateurs récupérées avec succès`);
      res.json(rows);
    }
  });
};

const addRecette = (req, res) => {
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

module.exports = {
  getRecettes,
  getUsers,
  addRecette,
};
