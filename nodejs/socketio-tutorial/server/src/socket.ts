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
