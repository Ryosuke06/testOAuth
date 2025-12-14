import { OAuthError } from "../presentation/error/OAuthError";
import { promises as fs } from "fs";
import path, { parse } from "path";
import {
  authorizationCodeSchema,
  StoreAccessTokenSchema,
  StoreMapSchema,
} from "../schema/AuthSchema";

import { AccessToken } from "../domain/AccessToken";

const AUTH_STORE_PATH = path.resolve(
  __dirname,
  "../data/authorizationCodeStore.json"
);

const ACCESS_TOKEN_PATH = path.resolve(
  __dirname,
  "../data/accessTokenStore.json"
);

import { TokenRepository } from "../repositories/TokenRepository";

export class TokenRepositoryImpl implements TokenRepository {
  // constructor(public params: any, public grant_type: string) {}

  private async writeStore(
    data: StoreMapSchema | StoreAccessTokenSchema,
    storeName: string
  ): Promise<void> {
    const dir = path.dirname(storeName);
    await fs.mkdir(dir, { recursive: true }); //dataフォルダがなかったら自動で作成　また、ファイルがあったら、何もしない
    await fs.writeFile(storeName, JSON.stringify(data, null, 2), "utf-8");
  }

  private async readStore(
    storeName: string
  ): Promise<StoreMapSchema | StoreAccessTokenSchema> {
    try {
      const buf = await fs.readFile(storeName, "utf-8");
      const parsed = JSON.parse(buf);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (err: any) {
      if (err.code === "ENOENT") {
        throw new Error();
      }
      throw err;
    }
  }

  private async delete(value: string, storeName: string): Promise<void> {
    const store = await this.readStore(storeName);
    if (store[value]) {
      delete store[value];
      await this.writeStore(store, storeName);
    }
  }

  async ValidateOAuthParameters(
    grantType: string,
    code: string,
    clientId: number,
    redirectUri: string
  ): Promise<void> {
    if (grantType === null || grantType === "") {
      throw new OAuthError(400, "invalid_request", "grantType is required.");
    }
    if (code === null || code === "") {
      throw new OAuthError(
        400,
        "invalid_request",
        "The authorization code is not found."
      );
    }
    if (clientId === null || clientId === 0) {
      throw new OAuthError(
        400,
        "invalid_request",
        "The authorization clientId is not found."
      );
    }
    if (redirectUri === null || redirectUri === "") {
      throw new OAuthError(
        400,
        "invalid_request",
        "The authorization redirectUri is not found."
      );
    }
  }

  async CheckCode(
    code: string,
    clientId: number,
    redirectUri: string
  ): Promise<authorizationCodeSchema> {
    const store = await this.readStore(AUTH_STORE_PATH);
    const data = store[code] as authorizationCodeSchema;
    if (!data) {
      throw new OAuthError(
        400,
        "invalid_grant",
        "The authorization code is not found."
      );
    }
    if (data.expiresAt.getTime() < Date.now()) {
      this.delete(data.value, AUTH_STORE_PATH);
      throw new OAuthError(
        400,
        "invalid_grant",
        "The authorization code has expired."
      );
    }
    if (data.redirectUri === redirectUri) {
      throw new OAuthError(400, "invalid_grant", "redirect_uri is wrong");
    }
    return data;
  }

  async postToken(accessToken: AccessToken): Promise<void> {
    const store = await this.readStore(ACCESS_TOKEN_PATH);
    store[accessToken.value] = accessToken;
    await this.writeStore(store, ACCESS_TOKEN_PATH);
  }
}
