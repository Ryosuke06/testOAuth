"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationCode = void 0;
const crypto_1 = require("crypto");
class AuthorizationCode {
    _value;
    _userId;
    _clientId;
    _scopes;
    _redirectUrl;
    _expires_at;
    constructor(_value, _userId, _clientId, _scopes, _redirectUrl, _expires_at) {
        this._value = _value;
        this._userId = _userId;
        this._clientId = _clientId;
        this._scopes = _scopes;
        this._redirectUrl = _redirectUrl;
        this._expires_at = _expires_at;
    }
    static create(userId, clientId, scopes, redirectUri) {
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10分間の有効期限
        const value = (0, crypto_1.randomBytes)(6).toString("base64url");
        return new AuthorizationCode(value, userId, clientId, scopes, redirectUri, expiresAt);
    }
}
exports.AuthorizationCode = AuthorizationCode;
//# sourceMappingURL=AuthorizationCode.js.map