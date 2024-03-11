require("dotenv").config({ path: "../.env" });
const Redis = require("ioredis");

const redisPublisher = new Redis({
  port: 6380,
  host: "127.0.0.1",
});

const publishUserTempCreated = (recipeName) => {
  return new Promise((resolve, reject) => {
    const message = JSON.stringify({
      action: "recipeCreated",
      recipeName: recipeName,
    });

    redisPublisher
      .publish("recipesChannel", message)
      .then(() => {
        console.log(
          `Retour Redis | Message publié pour la user '${recipeName}'.`,
        );
        resolve();
      })
      .catch((err) => {
        console.error("Retour Redis | Erreur lors de la publication:", err);
        reject(err);
      });
  });
};

module.exports = publishUserTempCreated;
