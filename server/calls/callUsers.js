const User = require("../models/UserModel");
const publishUserTempCreated = require("../db/redis/test");

// ---------- GET ---------------- //
const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Utilisateur non trouvé.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log(`${users.length} utilisateurs récupérées avec succès`);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

// -------------- POST ---------------- //
const addUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email ou mot de passe incorrect.");

      return res
        .status(409)
        .json({ error: "Email ou mot de passe incorrect." });
    }
    const newUser = new User({ email, username, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    await publishUserTempCreated(savedUser.username);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

// ---------- REMOVE ---------------- //
const removeUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).send("Utilisateur non trouvé.");
    }
    console.log(`Utilisateur ${userId} supprimé avec succès`);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

const removeAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    console.log(`Tous les utilisateurs ont été supprimés avec succès`);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  removeUser,
  removeAllUsers,
};
