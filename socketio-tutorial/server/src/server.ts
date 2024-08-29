import express from "express";
import SocketService from "./socket";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Server is running!!!</h1>');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const socketService = new SocketService();
socketService.io.attach(server);
socketService.initListeners()


// async function init() {
//   const socketService = new SocketService();
//   const httpServer = http.createServer();
//   const PORT = 3000;

//   socketService.io.attach(httpServer);

//   httpServer.listen(PORT, () => {
//     console.log(`HTTP Server is running on http://localhost:${PORT}`);
//   });

//   socketService.initListeners()
// }

// init();
