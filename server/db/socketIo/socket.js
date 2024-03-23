let io;
const userSockets = {};
const User = require("../../models/UserModel");
const { v4: uuidv4 } = require("uuid");

const setupWebSocket = (socketIoInstance) => {
  io = socketIoInstance;
  io.on("connection", (socket) => {
    //console.log("Client connecté", socket.id);

    /* socket.on("registerUserSocket", async (userId) => {
      console.log(`Associating user ${userId} with socket ${socket.id}`);
      userSockets[userId] = socket.id;
      const user = await User.findById(userId);
      if (user) {
        io.to(socket.id).emit("notification", {
          id: uuidv4(),
          type: "user-welcome",
          title: "Bienvenue dans notre application Sain Saveur !",
          content: "Bienvenue dans notre application Sain Saveur !",
          date: new Date().toISOString(),
          seen: false,
        });
      } else {
        console.log(`User not found: ${userId}`);
      }
    });*/
    socket.on("registerUserSocket", (userId) => {
      console.log(`Associating user ${userId} with socket ${socket.id}`);
      userSockets[userId] = socket.id;
    });

    socket.on("disconnect", () => {
      console.log(`Client déconnecté ${socket.id}`);
      Object.keys(userSockets).forEach((userId) => {
        if (userSockets[userId] === socket.id) {
          console.log(`Removing user ${userId} association`);
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
