let io;
const userSockets = {};
const User = require("../../models/UserModel");
const { v4: uuidv4 } = require("uuid");

const setupWebSocket = (socketIoInstance) => {
  io = socketIoInstance;
  io.on("connection", (socket) => {
    socket.on("registerUserSocket", (userId) => {
      userSockets[userId] = socket.id;
    });

    socket.on("disconnect", () => {
      console.log(`Client déconnecté ${socket.id}`);
      Object.keys(userSockets).forEach((userId) => {
        if (userSockets[userId] === socket.id) {
          delete userSockets[userId];
        }
      });
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io n'a pas été initialisé !");
  }
  return io;
};

module.exports = { setupWebSocket, getIo };
