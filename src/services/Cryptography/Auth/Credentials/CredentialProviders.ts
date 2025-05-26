import { Credentials } from "./Credentials.js";

export abstract class CredentialsProvider {
  /**
   * Returns the credentials for the provider.
   * @returns A promise that resolves to the credentials.
   */
  abstract getCredentials(): Promise<Credentials>;
}
