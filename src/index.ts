import express from "express";
import dotenv from "dotenv";
import messageRoutes from "./routes/messageRoutes.js";
import { setDatabaseImplementation } from "./models/Database.js";
import { dynamoDbImpl } from "./models/Database/dynamoDbClient.js";
import { pollMessages } from "./services/queueService.js";
import { DefaultAuthMiddleware } from "./middleware/auth.js";
import { getLogger } from "./objects/Logging/logger.js";

dotenv.config();
const Logger = getLogger();

const app = express();
app.use(express.json());

setDatabaseImplementation(dynamoDbImpl);
const defaultAuthMiddleware = new DefaultAuthMiddleware(); // Use DefaultAuthMiddleware or extend it as needed
app.use("/messages", defaultAuthMiddleware.getMiddleware(), messageRoutes);

pollMessages();

app.listen(3000, () => {
  Logger.log("Server listening on http://localhost:3000");
});
