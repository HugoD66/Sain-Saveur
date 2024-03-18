const mongoose = require("mongoose");
async function initMongo() {
  const url =
    "mongodb://127.0.0.1:27017/mydatabase" ||
    "'mongodb://localhost:27017/mydatabase";
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    console.log("Connecté à MongoDB avec succès.");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
  }
}

module.exports = initMongo;
