import { inherits } from "util";
import { Credentials } from "./Credentials.js";
import { Logger } from "../../../../objects/Logging/logger.js";

export interface CredentialsProviderInterface {
  getCredentials(): Credentials;
}

export interface SessionCredentialsProviderInterface {
  getSessionCredentials(): Promise<{
    clientId: string;
    SecretToken: string;
    AccessToken?: string;
  }>;
}

export class DefaultCredentials extends Credentials {
  constructor(
    public clientId: string = "default-client-id",
    public clientSecret: string = "default-client-secret",
    public username: string = "default-username",
    public password: string = "default-password"
  ) {
    super();
    Logger.warn(
      "DefaultCredentials should NOT be used in a production environment."
    );
  }
}

export interface SessionCredentials extends Credentials {
  clientId: string; // Sometimes called accessKeyId, or applicationID
  SecretToken: string;
  AccessToken?: string; // AKA sessionToken
  // Optional, used in some cases like AWS Cognito or other session-based auth systems
}

export interface CredentialsInterface {
  clientId: string;
  clientSecret: string;
  username: string;
}
