import express, { Express } from "express";
import { connectDB } from "./data/config/database.js";
import routes from "./api/routes/routes";
import cors from "cors";

require("dotenv").config();

const serverApp: Express = express();
const port = process.env.PORT || 5000;

// make baseUrl variable
serverApp.use(cors({ origin: "http://localhost:3000" }));
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
