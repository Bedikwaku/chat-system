export default interface DefaultCredentialsProviderInterface {
  // Made optional to test the null case
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
}
