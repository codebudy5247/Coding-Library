import { Server } from "socket.io";
import Redis, { Redis as RedisClient } from "ioredis";
import { Server as HttpServer } from "http";

const REDIS_URL =
  process.env.REDIS_URL ||
  "redis://default:5698d6027eb44f6e98b86259b06e29d3@apn1-useful-katydid-33905.upstash.io:33905";

class SocketService {
  private _io: Server;
  private _pub: RedisClient;
  private _sub: RedisClient;

  constructor(server: HttpServer) {
    this._io = new Server(server, {
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    this._pub = new Redis(REDIS_URL);
    this._sub = new Redis(REDIS_URL);
    this._sub.subscribe("MESSAGES");
  }

  public initListeners() {
    this._io.on("connect", (socket) => {
      console.log("New socket connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message received:", message);
        await this._pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    this._sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        this._io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;

// import { Server as HttpServer } from "http";
// import WebSocket, { Server as WebSocketServer } from "ws";

// class WebSocketService {
//   private _wss: WebSocketServer;

//   constructor(server: HttpServer) {
//     // Create a WebSocket server using the provided HTTP server
//     this._wss = new WebSocket.Server({ server });

//     // Initialize WebSocket listeners
//     this.initListeners();
//   }

//   private initListeners() {
//     this._wss.on("connection", (ws: WebSocket) => {
//       console.log("New WebSocket connection established");

//       // Listen for incoming messages from clients
//       ws.on("message", (message: string) => {
//         console.log("Received message from client:", message);

//         // Broadcast the message to all connected clients
//         this.broadcastMessage(message);
//       });

//       // Handle client disconnecting
//       ws.on("close", () => {
//         console.log("WebSocket connection closed");
//       });
//     });
//   }

//   private broadcastMessage(message: string) {
//     // Broadcast the message to all clients except the sender
//     this._wss.clients.forEach((client: WebSocket) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   }

//   get wss() {
//     return this._wss;
//   }
// }

// export default WebSocketService;
