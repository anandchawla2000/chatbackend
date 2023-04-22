require("dotenv").config();
const port = process.env.PORT||5000;
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const users = {};
io.on("connection", (socket) => {
  // console.log(socket.id)
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    // console.log(users);
  });

  socket.on("send-message", (message) => {
    // console.log(message);
    socket.broadcast.emit("receive-message", message);
  });
});
httpServer.listen(port,()=>{
    console.log(port)
});