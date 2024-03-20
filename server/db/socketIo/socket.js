let io;

const setupWebSocket = (socketIoInstance) => {
  io = socketIoInstance;
  io.on("connection", (socket) => {
    console.log("Client connecté");
  });
};

const getIo = () => {
  if (io) {
    console.log("io is defined");
  }
  if (!io) {
    throw new Error("Socket.io n'a pas été initialisé !");
  }
  return io;
};

module.exports = { setupWebSocket, getIo };
