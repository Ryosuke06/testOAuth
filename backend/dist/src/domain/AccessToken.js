"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
class AccessToken {
    _token;
    _userId;
    _clientId;
    _expiresAt;
    constructor(_token, _userId, _clientId, _expiresAt) {
        this._token = _token;
        this._userId = _userId;
        this._clientId = _clientId;
        this._expiresAt = _expiresAt;
    }
    static create(token, userId, clientId) {
        const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
    }
}
exports.AccessToken = AccessToken;
//# sourceMappingURL=AccessToken.js.map