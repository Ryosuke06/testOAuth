import { randomBytes } from "crypto";
import { AuthorizationCodeDuration } from "../const/site";

export class AuthorizationCode {
  constructor(
    private _value: string,
    private _userId: number,
    private _clientId: number,
    private _scopes: string[],
    private _redirectUri: string,
    private _expires_at: Date
  ) {}

  static create(
    userId: number,
    clientId: number,
    scopes: string[],
    redirectUri: string
  ) {
    const expiresAt = new Date(Date.now() + AuthorizationCodeDuration * 1000); //site.tsファイルで定義してある時間の有効期限
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

  get value() {
    return this._value;
  }
  get userId() {
    return this._userId;
  }
  get clientId() {
    return this._clientId;
  }
  get scopes() {
    return this._scopes;
  }
  get redirectUri() {
    return this._redirectUri;
  }
  get expiresAt() {
    return this._expires_at;
  }
}
