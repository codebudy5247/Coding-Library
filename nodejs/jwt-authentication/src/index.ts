import { createServer } from "./server";

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
