import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { ChatMessage } from "../../types/Message.js";
import { DatabaseInterface } from "../iDatabase.js";

// const client = new DynamoDBClient({ region: "us-east-1" });
const TABLE_NAME = "ChatMessages";

export const dynamoDbImpl: DatabaseInterface = {
  saveMessage: async (msg: ChatMessage): Promise<void> => {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        messageId: { S: msg.id },
        recepient: { S: msg.recepient },
        sender: { S: msg.sender },
        content: { S: msg.content },
        timestamp: { N: msg.timestamp.toString() },
      },
    };
    // await client.send(new PutItemCommand(params));
  },

  getMessagesForUser: async (userId: string): Promise<ChatMessage[]> => {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": { S: userId },
      },
    };
    //   // const result = await client.send(new QueryCommand(params));
    // return (result.Items || []).map((item) => ({
    //   id: item.messageId.S!,
    //   userId: item.userId.S!,
    //   content: item.content.S!,
    //   timestamp: parseInt(item.timestamp.N!),
    // }));

    return []; // Placeholder return for now
  },
};
