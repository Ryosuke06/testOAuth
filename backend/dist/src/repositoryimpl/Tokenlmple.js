"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepositoryImpl = void 0;
const OAuthError_1 = require("../presentation/error/OAuthError");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const AUTH_STORE_PATH = path_1.default.resolve(__dirname, "../data/authorizationCodeStore.json");
const ACCESS_TOKEN_PATH = path_1.default.resolve(__dirname, "../data/accessTokenStore.json");
class TokenRepositoryImpl {
    // constructor(public params: any, public grant_type: string) {}
    async writeStore(data, storeName) {
        const dir = path_1.default.dirname(storeName);
        await fs_1.promises.mkdir(dir, { recursive: true }); //dataフォルダがなかったら自動で作成　また、ファイルがあったら、何もしない
        await fs_1.promises.writeFile(storeName, JSON.stringify(data, null, 2), "utf-8");
    }
    async readStore(storeName) {
        try {
            const buf = await fs_1.promises.readFile(storeName, "utf-8");
            const parsed = JSON.parse(buf);
            return parsed && typeof parsed === "object" ? parsed : {};
        }
        catch (err) {
            if (err.code === "ENOENT") {
                return {};
            }
            throw err;
        }
    }
    async delete(value, storeName) {
        const store = await this.readStore(storeName);
        if (store[value]) {
            delete store[value];
            await this.writeStore(store, storeName);
        }
    }
    async ValidateOAuthParameters(grantType, code, clientId, redirectUri) {
        if (grantType === null || grantType === "") {
            throw new OAuthError_1.OAuthError(400, "invalid_request", "grantType is required.");
        }
        if (code === null || code === "") {
            throw new OAuthError_1.OAuthError(400, "invalid_request", "The authorization code is not found.");
        }
        if (clientId === null || clientId === 0) {
            throw new OAuthError_1.OAuthError(400, "invalid_request", "The authorization clientId is not found.");
        }
        if (redirectUri === null || redirectUri === "") {
            throw new OAuthError_1.OAuthError(400, "invalid_request", "The authorization redirectUri is not found.");
        }
    }
    async CheckCode(code, clientId, redirectUri) {
        const store = await this.readStore(AUTH_STORE_PATH);
        const data = store[code];
        if (!data) {
            throw new OAuthError_1.OAuthError(400, "invalid_grant", "The authorization code is not found.");
        }
        const expiresAt = new Date(data.expiresAt);
        if (expiresAt.getTime() < Date.now()) {
            this.delete(data.value, AUTH_STORE_PATH);
            throw new OAuthError_1.OAuthError(400, "invalid_grant", "The authorization code has expired.");
        }
        if (data.redirectUri !== redirectUri) {
            throw new OAuthError_1.OAuthError(400, "invalid_grant", "redirect_uri is wrong");
        }
        return data;
    }
    async postToken(accessToken) {
        const store = await this.readStore(ACCESS_TOKEN_PATH);
        store[accessToken.value] = accessToken;
        await this.writeStore(store, ACCESS_TOKEN_PATH);
    }
}
exports.TokenRepositoryImpl = TokenRepositoryImpl;
//# sourceMappingURL=Tokenlmple.js.map