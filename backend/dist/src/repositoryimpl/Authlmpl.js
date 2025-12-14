"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationRepositoryImpl = void 0;
const Client_1 = require("../domain/Client");
const clientData = __importStar(require("../mocks/ClientData.json"));
const site_1 = require("../const/site");
const User_1 = require("../domain/User");
const userData = __importStar(require("../mocks/UserData.json"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const STORE_PATH = path_1.default.resolve(__dirname, "../data/authorizationCodeStore.json");
class AuthorizationRepositoryImpl {
    //   constructor();
    async writeStore(data) {
        const dir = path_1.default.dirname(STORE_PATH);
        await fs_1.promises.mkdir(dir, { recursive: true }); //dataフォルダがなかったら自動で作成　また、ファイルがあったら、何もしない
        await fs_1.promises.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
    }
    async readStore() {
        try {
            const buf = await fs_1.promises.readFile(STORE_PATH, "utf-8");
            const parsed = JSON.parse(buf);
            return parsed && typeof parsed === "object" ? parsed : {};
        }
        catch (err) {
            if (err.code === "ENOENT") {
                await this.writeStore({});
                return {};
            }
            throw err;
        }
    }
    async delete(value) {
        const store = await this.readStore();
        if (store[value]) {
            delete store[value];
            await this.writeStore(store);
        }
    }
    async lookUpClient(clientId) {
        const client = clientData.client.find((client) => client.client_id === clientId);
        if (!client) {
            return null;
        }
        return new Client_1.Client(client.client_id, client.client_name, client.redirect_urls);
    }
    async lookupUser(login_id, password) {
        const user = userData.user.find((user) => user.login_id === login_id && user.password === password);
        if (!user) {
            return null;
        }
        return User_1.User.create(user.user_id, user.login_id, user.password);
    }
    async filterScopes(valueScopes) {
        if (!valueScopes || valueScopes.length === 0) {
            // valueScopes === null にした方がいい？
            throw new Error("権限がありません");
        }
        const scope = valueScopes.filter((value1) => {
            return site_1.SupportedScopes.find((value2) => {
                return value1 === value2;
            });
        });
        return scope.join(" ");
    }
    async save(value) {
        const store = await this.readStore();
        const item = {
            value: value.value,
            userId: value.userId,
            clientId: value.clientId,
            scopes: value.scopes,
            redirectUri: value.redirectUri,
            expiresAt: value.expiresAt,
        };
        store[value.value] = item;
        await this.writeStore(store);
    }
}
exports.AuthorizationRepositoryImpl = AuthorizationRepositoryImpl;
//# sourceMappingURL=Authlmpl.js.map