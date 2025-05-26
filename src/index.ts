import express from "express";
import dotenv from "dotenv";
import messageRoutes from "./routes/messageRoutes.js";
import { setDatabaseImplementation } from "./models/Database.js";
import { dynamoDbImpl } from "./models/Database/dynamoDbClient.js";
import { pollMessages } from "./services/queueService.js";

dotenv.config();

const app = express();
app.use(express.json());

setDatabaseImplementation(dynamoDbImpl);

app.use("/messages", messageRoutes);

pollMessages();

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
