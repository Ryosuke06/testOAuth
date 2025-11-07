"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeUseCase = void 0;
const AuthorizationCode_1 = require("../../domain/AuthorizationCode");
class AuthorizeUseCase {
    clientRepo;
    authCodeRepo;
    tokenGenerator;
    constructor(clientRepo, authCodeRepo, tokenGenerator) {
        this.clientRepo = clientRepo;
        this.authCodeRepo = authCodeRepo;
        this.tokenGenerator = tokenGenerator;
    }
    async execute(clientId, redirectUri) {
        const client = await this.clientRepo.findById(clientId);
        if (!client || !client.redirectUris(redirectUri)) {
            throw new Error("Invalid client or redirect URI");
        }
        const userId = "user-123";
        const value = this.tokenGenerator.generate();
        const scoped = ["read", "write"];
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10分の有効期限
        const authCode = new AuthorizationCode_1.AuthorizationCode(value, userId, clientId, scoped, redirectUri, expiresAt);
    }
}
exports.AuthorizeUseCase = AuthorizeUseCase;
//# sourceMappingURL=AuthorizaUseCase.js.map