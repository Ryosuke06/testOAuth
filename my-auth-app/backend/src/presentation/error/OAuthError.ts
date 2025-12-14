export class OAuthError extends Error {
  constructor(
    public status: number,
    public error: string,
    public error_description: string
  ) {
    super(error_description);
    this.name = "OAuthError";
  }
}
