const { Server } = require("socket.io");

let io;

module.exports = {
  initSocket: (server) => {
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", (socket) => {
      console.log("Client connected");
      socket.on("disconnect", () => console.log("Client disconnected"));
    });
    return io;
  },
  emitPageView: (data) => {
    if (io) {
      io.emit("pageView", data);
    }
  },
};
