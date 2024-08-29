import { Server } from "socket.io";
import Redis from "ioredis";

const REDIS_URL =
  "redis://default:5698d6027eb44f6e98b86259b06e29d3@apn1-useful-katydid-33905.upstash.io:33905";
/* Username: default
   Password: 5698d6027eb44f6e98b86259b06e29d3
   Host: apn1-useful-katydid-33905.upstash.io
   Port: 33905 
*/

const pub = new Redis(REDIS_URL);
const sub = new Redis(REDIS_URL);

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;
    io.on("connect", (socket) => {
      console.log("New socket connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message recieved:", message);

        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
