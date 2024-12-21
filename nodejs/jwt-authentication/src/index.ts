require("dotenv").config();
import { createServer } from "./server";
import { errorMiddleware } from "./modules/exceptions/errors";

const port = process.env.PORT || 4000;
const server = createServer();

server.use(errorMiddleware);

server.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
