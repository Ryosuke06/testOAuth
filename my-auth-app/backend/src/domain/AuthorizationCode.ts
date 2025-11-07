import { randomBytes } from "crypto";

export class AuthorizationCode {
  constructor(
    private _value: string,
    private _userId: number,
    private _clientId: number,
    private _scopes: string[],
    private _redirectUrl: string,
    private _expires_at: Date
  ) {}

  static create(
    userId: number,
    clientId: number,
    scopes: string[],
    redirectUri: string
  ) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10分間の有効期限
    const value = randomBytes(6).toString("base64url");

    return new AuthorizationCode(
      value,
      userId,
      clientId,
      scopes,
      redirectUri,
      expiresAt
    );
  }
}
