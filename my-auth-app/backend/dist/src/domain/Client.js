"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    _clientId;
    _clientName;
    _redirectUris;
    constructor(_clientId, _clientName, _redirectUris) {
        this._clientId = _clientId;
        this._clientName = _clientName;
        this._redirectUris = _redirectUris;
    }
    static create(clientId, clientName, redirectUri) {
        return new Client(clientId, clientName, redirectUri);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map