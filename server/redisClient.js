require("dotenv").config();
const redis = require("redis");

// Afficher les variables d'environnement pour le débogage
console.log(
  `REDIS HOST: ${process.env.REDIS_HOST}, REDIS PORT: ${process.env.REDIS_PORT}`,
);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient
  .connect()
  .then(() => console.log("Connecté à Redis avec succès."))
  .catch(console.error);

module.exports = redisClient;
