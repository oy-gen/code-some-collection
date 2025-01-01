import express, { Express } from "express";
import { connectDB } from "./data/config/database.js";
import routes from "./api/routes/routes";

require("dotenv").config();

export const serverApp: Express = express();
const port = process.env.PORT || 5000;

serverApp.use(express.json());
serverApp.use("/", routes);

const startServer = async () => {
  try {
    await connectDB();
    serverApp.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default serverApp;