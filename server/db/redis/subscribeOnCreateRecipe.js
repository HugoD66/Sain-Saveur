/*
require("dotenv").config({ path: "../../.env" });
const Redis = require("ioredis");

const redisPublisher = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const publishRecipeCreated = (recipeName) => {
  return new Promise((resolve, reject) => {
    const message = JSON.stringify({
      action: "recipeCreated",
      recipeName: recipeName,
    });

    redisPublisher
      .publish("recipesChannel", message)
      .then(() => {
        console.log(
          `Retour Redis | Message publié pour la recette '${recipeName}'.`,
        );
        resolve();
      })
      .catch((err) => {
        console.error("Retour Redis | Erreur lors de la publication:", err);
        reject(err);
      });
  });
};

module.exports = publishRecipeCreated;

 */
