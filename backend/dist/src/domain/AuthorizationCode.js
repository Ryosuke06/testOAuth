"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationCode = void 0;
const crypto_1 = require("crypto");
const site_1 = require("../const/site");
class AuthorizationCode {
    _value;
    _userId;
    _clientId;
    _scopes;
    _redirectUri;
    _expires_at;
    constructor(_value, _userId, _clientId, _scopes, _redirectUri, _expires_at) {
        this._value = _value;
        this._userId = _userId;
        this._clientId = _clientId;
        this._scopes = _scopes;
        this._redirectUri = _redirectUri;
        this._expires_at = _expires_at;
    }
    static create(userId, clientId, scopes, redirectUri) {
        const expiresAt = new Date(Date.now() + site_1.AccessTokenDuration * 1000); //site.tsファイルで定義してある時間の有効期限
        const value = (0, crypto_1.randomBytes)(6).toString("base64url");
        return new AuthorizationCode(value, userId, clientId, scopes, redirectUri, expiresAt);
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
exports.AuthorizationCode = AuthorizationCode;
//# sourceMappingURL=AuthorizationCode.js.map