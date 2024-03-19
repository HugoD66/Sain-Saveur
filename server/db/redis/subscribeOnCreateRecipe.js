require("dotenv").config({ path: "../.env" });
const Redis = require("ioredis");
const socketIo = require("socket.io");
const server = require("../../server");
//const io = require("socket.io");
//const io = socketIo(server);
const redisPublisher = new Redis({
  port: 6380,
  host: "127.0.0.1",
});

const io = socketIo(
  server,
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  },
  { transports: ["websocket"] },
);
/*
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});
 */
const publishRecipeCreated = (recipe) => {
  return new Promise((resolve, reject) => {
    // Préparer les messages pour Redis et Socket.IO
    //const redisMessage = JSON.stringify({
    //  action: "recipeCreated",
    //  recipeName: recipe.recipe_name,
    //});
    const socketMessage = JSON.stringify({ action: "recipeCreated", recipe });
    io.emit("recipeCreated", socketMessage);

    //redisPublisher
    //  .publish("recipesChannel", redisMessage)
    //  .then(() => {
    //    console.log(
    //      `Retour Redis | Message publié pour la recette '${recipe.recipe_name}'.`,
    //    );
    //    console.log(`Envoi de la notification: ${socketMessage}`);
    //    resolve();
    //  })
    //  .catch((err) => {
    //    console.error("Retour Redis | Erreur lors de la publication:", err);
    //    reject(err);
    //  });
  });
};
module.exports = publishRecipeCreated;
