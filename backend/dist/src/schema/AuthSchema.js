"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationCode = exports.postRequestToken = exports.postAuthSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.postAuthSchema = zod_1.default.object({
    client_id: zod_1.default.string(),
    state: zod_1.default.string(),
    scopes: zod_1.default.array(zod_1.default.string()).nonempty(),
    redirect_uri: zod_1.default.string().url(),
    response_type: zod_1.default.string(),
    login_id: zod_1.default.string(),
    password: zod_1.default.string(),
    // Approveボタンが押されたかどうかの判定
    approve: zod_1.default.boolean(),
});
exports.postRequestToken = zod_1.default.object({
    grant_type: zod_1.default.string(),
    code: zod_1.default.string(),
    client_id: zod_1.default.number(),
    redirect_uri: zod_1.default.string().url(),
});
exports.authorizationCode = zod_1.default.object({
    value: zod_1.default.string(),
    userId: zod_1.default.number(),
    clientId: zod_1.default.number(),
    scopes: zod_1.default.array(zod_1.default.string()).nonempty(),
    redirectUri: zod_1.default.string(),
    expiresAt: zod_1.default.date(), //stringにしなければならないかも？
});
//# sourceMappingURL=AuthSchema.js.map