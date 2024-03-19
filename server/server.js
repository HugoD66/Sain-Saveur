require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const initMongo = require("./db/mongoDB/mongoSetup");
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const typeRoutes = require("./routes/typeRoutes");
const ingredientRoutes = require("./routes/ingredientsRoutes");
const fixturesRoutes = require("./routes/fixturesRoutes");

const cors = require("cors");
const { createServer } = require("http");
const app = express();
const PORT = process.env.PORT || 4700;
const server = createServer(app);
const io = require("socket.io")(server);

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/recipes-type", typeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/security", authRoutes);
app.use("/api/fixtures", fixturesRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/ingredients", ingredientRoutes);

initMongo().catch(console.error);

server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
io.on("connection", (socket) => {
  console.log("Client connected");
  // Gérer les événements de socket ici
});
/*
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
 */
module.exports = server;
