import expressApp from "./expressApp";

export const startServer = async () => {
  expressApp.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });

  process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });
};


startServer().then(() => {
  console.log("Server started successfully");
})