const mongoose = require("mongoose");
const User = require("../models/UserModel");

const users = [
  {
    email: "user1@example.com",
    username: "user1",
    password: "password1",
  },
  {
    email: "user2@example.com",
    username: "user2",
    password: "password2",
  },
  {
    email: "user3@example.com",
    username: "user3",
    password: "password3",
  },
];

async function insertUsers() {
  try {
    // Vérifiez si mongoose est déjà connecté, sinon connectez-vous

    // Optionnel : Supprimez tous les utilisateurs existant
    // await User.deleteMany({});

    const createdUsers = await User.insertMany(users);
    console.log(`Utilisateurs ajoutés avec succès:`, createdUsers);
  } catch (error) {
    console.error(`Erreur lors de l'ajout des utilisateurs:`, error);
    await mongoose.connection.close();
  }
}

module.exports = insertUsers;
