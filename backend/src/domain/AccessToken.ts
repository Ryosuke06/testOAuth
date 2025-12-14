import { randomBytes } from "crypto";
import { userInfo } from "os";

export class AccessToken {
  constructor(
    private _value: string,
    private _userId: number,
    private _clientId: number,
    private _scopes: string[],
    private _expiresAt: Date
  ) {}

  static create(userId: number, clientId: number, scopes: string[]) {
    const newToken = randomBytes(6).toString("base64url");
    const expiredAt = new Date(Date.now() + 10 * 60 * 1000);

    return new AccessToken(newToken, userId, clientId, scopes, expiredAt);
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
  get expiresAt() {
    return this._expiresAt;
  }
}
