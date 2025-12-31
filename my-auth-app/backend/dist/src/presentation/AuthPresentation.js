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
exports.AuthorizationPresentation = void 0;
const tsyringe_1 = require("tsyringe");
const site_1 = require("../const/site");
let AuthorizationPresentation = class AuthorizationPresentation {
    AuthorizeUseCase;
    constructor(AuthorizeUseCase) {
        this.AuthorizeUseCase = AuthorizeUseCase;
    }
    async decision(req, res) {
        const request = req.body;
        const baseLocation = `${request.redirect_uri}?state=${request.state}`;
        if (request.approve === false) {
            return res.redirect(302, `${baseLocation}&error=access_denied&error_description=End-user+authentication-failed.`);
        }
        // ここから試しに書いてみる
        //　redirect_uriが配列か文字列か両方に対応
        // const redirectUri =
        //   Array.isArray(request.redirect_uri) && request.redirect_uri.length > 0
        //     ? request.redirect_uri[0]
        //     : (request.redirect_uri as unknown as string);
        // const baseLocation = `${redirectUri}?state=${request.state}`;
        // if (request.approve === false) {
        //   const errorLocation = `${baseLocation}&error=access_denied&error_description=End-user+authentication-failed.`;
        //   return res.status(200).json({
        //     success: false,
        //     redirect_uri: errorLocation,
        //     error: "access_denied",
        //     error_description: "End-user authentication failed.",
        //   });
        // }
        // ここまで試しに書いてみる
        const user = await this.AuthorizeUseCase.findUser(request.login_id, request.password);
        if (user === null) {
            throw new Error("not user");
        }
        // 認可コードを生成して保存する
        const code = await this.AuthorizeUseCase.createAuthorizationCode(user.userId, req.body.client_id, req.body.scopes, req.body.redirect_uri);
        return res.redirect(302, `${baseLocation}&code=${code.value}`);
    }
    async token(req, res) {
        const request = req.body;
        // TODO ここにtryをして、HTTPコードを返すように実装する必要ありそう
        await this.AuthorizeUseCase.ValidateOAuthParameters(request.grant_type, request.code, request.client_id, request.redirect_uri);
        const code = await this.AuthorizeUseCase.checkCode(request.code, request.client_id, request.redirect_uri);
        const token = await this.AuthorizeUseCase.makeNewToken(code.value, code.userId, code.clientId, code.scopes);
        return res.json({
            accessToken: token.value,
            tokenType: "Bearer",
            expiresIn: site_1.AccessTokenDuration,
            scope: (token.scopes || []).join(" "),
        });
    }
};
exports.AuthorizationPresentation = AuthorizationPresentation;
exports.AuthorizationPresentation = AuthorizationPresentation = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Info")),
    __metadata("design:paramtypes", [Object])
], AuthorizationPresentation);
//# sourceMappingURL=AuthPresentation.js.map