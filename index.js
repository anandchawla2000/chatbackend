require("dotenv").config();
const port = process.env.PORT||5000;
const { createServer } = require("https");
const { Server } = require("socket.io");

const httpsServer = createServer();
const io = new Server(httpsServer, {
  cors: {
    origin: "https://anand-chat.netlify.app/",
  },
});
const users = {};
io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    // console.log(users);
  });

  socket.on("send-message", (message) => {
    console.log(message);
    socket.broadcast.emit("receive-message", message);
  });
});
httpsServer.listen(port,()=>{
    console.log(port)
});