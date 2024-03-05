const db = require("../db/dbSetup");

// ---------- GET ---------------- //
const getUser = (req, res) => {
  const userId = req.params.userId;
  const sql = `SELECT * FROM Users WHERE id = ?`;
  db.get(sql, [userId], (err, row) => {
    if (err) {
      res.status(500).send("Erreur interne du serveur");
      console.error(err.message);
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send("Utilisateur non trouvé.");
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
// -------------- POST ---------------- //
const addUser = (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const sql = "INSERT INTO Users (email, username, password) VALUES (?, ?, ?)";

  db.run(sql, [email, username, password], function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur interne du serveur");
    } else {
      res.json({
        id: this.lastID,
        email,
        username,
        password,
      });
    }
  });
};

// ---------- REMOVE ---------------- //
const removeUser = (req, res) => {
  const userId = req.params.userId;
  const sql = `DELETE FROM Users WHERE id = ?`;
  db.run(sql, [userId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur interne du serveur");
    } else {
      console.log(`Utilisateur ${userId} supprimé avec succès`);
      res.status(204).send();
    }
  });
};
const removeAllUsers = (req, res) => {
  db.run("DELETE FROM Users", (err) => {
    if (err) {
      console.error(err);
      if (res) res.status(500).send("Erreur interne du serveur");
    } else {
      console.log(`Tous users ont été supprimées avec succès`);
    }
  });
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  removeUser,
  removeAllUsers,
};
