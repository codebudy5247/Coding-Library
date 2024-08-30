import express from "express";
import SocketService from "./socket";

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Server is running!!!</h1>');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  const socketService = new SocketService(server);
  socketService.initListeners();
});
