"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
const crypto_1 = require("crypto");
class AccessToken {
    _value;
    _userId;
    _clientId;
    _scopes;
    _expiresAt;
    constructor(_value, _userId, _clientId, _scopes, _expiresAt) {
        this._value = _value;
        this._userId = _userId;
        this._clientId = _clientId;
        this._scopes = _scopes;
        this._expiresAt = _expiresAt;
    }
    static create(userId, clientId, scopes) {
        const newToken = (0, crypto_1.randomBytes)(6).toString("base64url");
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
exports.AccessToken = AccessToken;
//# sourceMappingURL=AccessToken.js.map