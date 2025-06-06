import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { ChatMessage } from "../../types/Message.js";
import { DatabaseInterface } from "../Database.js";
import {
  CredentialsProviderInterface,
  DefaultCredentials,
  SessionCredentials,
} from "../../services/Cryptography/Auth/Credentials/credentialsProvider.js";
import { Credentials } from "../../services/Cryptography/Auth/Credentials/Credentials.js";
import { marshall } from "@aws-sdk/util-dynamodb";
import { CredentialsProvider } from "../../services/Cryptography/Auth/Credentials/CredentialProviders.js";
import { DefaultCredentialsProviderInterface } from "../../services/Cryptography/Auth/Credentials/CredentialProviders/defaultCredentialsProvider.js";
import { AWS_CONFIG } from "../../states/Configs/AwsConfig.js";
import { Logger } from "../../objects/Logging/logger.js";
import { Conversation, ConversationStatus } from "../Conversation.js";
// Removed import of fromStatic as it's not needed; use static credentials directly in the client config.

// const client = new DynamoDBClient({ region: "us-east-1" });
const TABLE_NAME = "ChatMessages";
const getClient = () => {
  const client = new DynamoDBClient({
    ...AWS_CONFIG, // Replace with your region
    credentials: {
      accessKeyId: "YOUR_ACCESS_KEY_ID",
      secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
    },
  });
  return client;
};

interface DynamodbCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string; // Optional, used for session-based auth
}

let client: DynamoDBClient | null = null;
export const createDynamoDbClient = async (
  credentials?: DynamodbCredentials,
  credentialsProvider?: DefaultCredentialsProviderInterface // Todo: Implement AWS Credentials Provider
): Promise<DynamoDBClient> => {
  if (client) {
    Logger.warn(
      "createDynamoDbClient: Attempted to create a new DynamoDB client, but one already exists."
    );
    return Promise.resolve(client);
  }

  if (!credentials && !credentialsProvider) {
    throw new Error(
      "No credentials or credentials provider provided for DynamoDB client creation."
    );
  } else if (credentials && credentialsProvider) {
    Logger.warn(
      "createDynamoDbClient: Both credentials and credentials provider provided. Using credentials."
    );
    return Promise.resolve(
      new DynamoDBClient({
        ...AWS_CONFIG, // Replace with your region
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken, // Optional
        },
      })
    );
  } else if (!credentials && credentialsProvider) {
    Logger.debug(
      "createDynamoDbClient: Using credentials provider to obtain credentials."
    );
    const credentials = await credentialsProvider.getCredentials();
    return Promise.resolve(
      new DynamoDBClient({
        ...AWS_CONFIG, // Replace with your region
        credentials: {
          accessKeyId: credentials.clientId,
          secretAccessKey: credentials.clientSecret,
        },
      })
    );
  } else {
    Logger.debug(
      "createDynamoDbClient: Using static credentials for DynamoDB client."
    );
    return Promise.resolve(
      new DynamoDBClient({
        ...AWS_CONFIG,
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken, // Optional
        },
      })
    );
  }
};

export const dynamoDbImpl: DatabaseInterface = {
  saveMessage: async (msg: ChatMessage): Promise<void> => {
    Logger.warn(
      "dynamoDbImpl.saveMessage: DynamoDB not implemented yet, using mock implementation."
    );
    return Promise.resolve();

    const client = getClient();
    const params = {
      TableName: TABLE_NAME,
      Item: marshall(msg),
    };
    await client.send(new PutItemCommand(params));
    return Promise.resolve();
  },
  getConversation: async (conversationId: string): Promise<Conversation> => {
    Logger.warn(
      "dynamoDbImpl.getConversation: DynamoDB not implemented yet, using mock implementation."
    );
    return {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: conversationId,
      userIds: [],
      messages: [],
      status: ConversationStatus.ACTIVE,
    };

    // const client = getClient();
    // const params = {
    //   TableName: TABLE_NAME,
    //   KeyConditionExpression: "conversationId = :conversationId",
    //   ExpressionAttributeValues: {
    //     ":conversationId": { S: conversationId },
    //   },
    // };
    // const result = await client.send(new QueryCommand(params));
    // return result.Items ? result.Items.map((item) => unmarshall(item)) : [];
  },
};
