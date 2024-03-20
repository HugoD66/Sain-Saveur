require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const initMongo = require("./db/mongoDB/mongoSetup");
const { setupWebSocket } = require("./db/socketIo/socket");
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const typeRoutes = require("./routes/typeRoutes");
const ingredientRoutes = require("./routes/ingredientsRoutes");
const fixturesRoutes = require("./routes/fixturesRoutes");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 4700;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors(corsOptions));

app.use("/api/recipes-type", typeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/security", authRoutes);
app.use("/api/fixtures", fixturesRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/ingredients", ingredientRoutes);

app.use("/uploads", express.static("./uploads"));

initMongo().catch(console.error);
setupWebSocket(io);

server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
io.on("connection", (socket) => {
  console.log("Client connected");
});
/*
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
 */
module.exports = { app, server, io };
