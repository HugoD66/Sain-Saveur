require("dotenv").config({ path: "./.env" });
const redis = require("redis");

// Afficher les variables d'environnement pour le débogage
console.log(`Tentative de connexion à Redis avec les paramètres suivants :`);
console.log(
  `REDIS HOST: ${process.env.REDIS_HOST}, REDIS PORT: ${process.env.REDIS_PORT}`,
);

// Initialisation du client Redis
console.log("Initialisation du client Redis...");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  family: 4,
});

// Tentative de connexion
console.log("Tentative de connexion à Redis...");
redisClient
  .connect()
  .then(() => console.log("Connecté à Redis avec succès."))
  .catch((error) => {
    console.error("Erreur lors de la tentative de connexion à Redis:", error);
  });

module.exports = redisClient;
