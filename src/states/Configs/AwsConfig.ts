export const AWS_CONFIG = {
  region: "us-east-1",
  dynamoDbTableName: "ChatMessages",
  // sqsQueueUrl:"https://sqs.us-east-1.amazonaws.com/123456789012/your-sqs-queue", // Optional, specify if using SQS
  // cloudWatchLogGroupName: "your-cloudwatch-log-group", // Optional, specify if using CloudWatch
  // cloudWatchLogStreamName: "your-cloudwatch-log-stream", // Optional, specify if using CloudWatch
  //... Add more AWS service configurations as needed
};
// This configuration object can be used throughout your application to access AWS services.
