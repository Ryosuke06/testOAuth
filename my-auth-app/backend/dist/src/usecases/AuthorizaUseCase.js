"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AuthorizationCode_1 = require("../domain/AuthorizationCode");
const AccessToken_1 = require("../domain/AccessToken");
let AuthorizeUseCase = class AuthorizeUseCase {
    authorizationRepository;
    tokenRepository;
    constructor(authorizationRepository, tokenRepository) {
        this.authorizationRepository = authorizationRepository;
        this.tokenRepository = tokenRepository;
    }
    async findUser(login_id, password) {
        const user = this.authorizationRepository.lookupUser(login_id, password);
        return user;
    }
    async createAuthorizationCode(userId, clientId, scope, redirectUri) {
        const auth = AuthorizationCode_1.AuthorizationCode.create(userId, clientId, scope, redirectUri);
        await this.authorizationRepository.save(auth);
        return auth;
    }
    async ValidateOAuthParameters(grantType, code, clientId, redirectUri) {
        await this.tokenRepository.ValidateOAuthParameters(grantType, code, clientId, redirectUri);
        return null;
    }
    async checkCode(code, clientId, redirectUri) {
        return await this.tokenRepository.CheckCode(code, clientId, redirectUri);
    }
    async makeNewToken(value, userId, clientId, scopes) {
        const newToken = AccessToken_1.AccessToken.create(userId, clientId, scopes);
        await this.tokenRepository.postToken(newToken);
        await this.authorizationRepository.delete(value);
        return newToken;
    }
};
exports.AuthorizeUseCase = AuthorizeUseCase;
exports.AuthorizeUseCase = AuthorizeUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("AuthorizationRepository")),
    __param(1, (0, tsyringe_1.inject)("TokenRepository")),
    __metadata("design:paramtypes", [Object, Object])
], AuthorizeUseCase);
//# sourceMappingURL=AuthorizaUseCase.js.map