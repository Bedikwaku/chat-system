import { Client } from "../Client.js";

export interface DynamoDBClientInterface extends Client {
  getItem(params: { TableName: string; Key: any }): Promise<any>;
  putItem(params: { TableName: string; Item: any }): Promise<any>;
  updateItem(params: {
    TableName: string;
    Key: any;
    UpdateExpression: string;
    ExpressionAttributeValues: any;
  }): Promise<any>;
  deleteItem(params: { TableName: string; Key: any }): Promise<any>;
  query(params: {
    TableName: string;
    KeyConditionExpression: string;
    ExpressionAttributeValues: any;
  }): Promise<any>;
  scan(params: { TableName: string }): Promise<any>;
}
