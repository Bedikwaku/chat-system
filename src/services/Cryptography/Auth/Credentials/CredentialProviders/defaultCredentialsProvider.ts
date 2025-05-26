import { CredentialsProvider } from "../CredentialProviders.js";
import { DefaultCredentials } from "../credentialsProvider.js";

export class DefaultCredentialsProviderInterface extends CredentialsProvider {
  getCredentials(): Promise<DefaultCredentials> {
    console.warn(
      "DefaultCredentialsProviderInterface should NOT be used in a production environment. " +
        "Please implement a custom credentials provider for your application."
    );
    return Promise.resolve(
      new DefaultCredentials(
        "default-client-id",
        "default-client-secret",
        "default-username",
        "default-password"
      )
    );
  }
}
