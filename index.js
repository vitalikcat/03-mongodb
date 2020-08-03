require = require("esm")(module);
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import contactRouters from "./contacts/contact.routers";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDataBase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use("/contacts", contactRouters);
  }

  async initDataBase() {
    await mongoose
      .connect(MONGODB_URL, { useUnifiedTopology: true })
      .then(() => console.log("Database connection successful"))
      .catch((error) => {
        console.log("Error: ", error);
        process.exit(1);
      });
  }

  startListening() {
    this.server.listen(PORT, (error) => {
      if (error) {
        return console.log("something bad happened", error);
      }
      console.log("Server is runnig on port: ", PORT);
    });
  }
}

export default new Server();
