require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const initMongo = require("./db/mongoDB/mongoSetup");

const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const typeRoutes = require("./routes/typeRoutes");
const fixturesRoutes = require("./routes/fixturesRoutes");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4700;

// Middleware pour parser les données JSON dans les requêtes
app.use(bodyParser.json());
app.use(cors());

app.use("/api/recipes-type", typeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/security", authRoutes);
app.use("/api/fixtures", fixturesRoutes);
app.use("/api/types", typeRoutes);

initMongo().catch(console.error);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
