import { Client } from "../domain/Client";
import * as clientData from "../mocks/ClientData.json";
import { SupportedScopes } from "../const/site";
import { User } from "../domain/User";
import * as userData from "../mocks/UserData.json";

import { promises as fs } from "fs";
import path from "path";
import { AuthorizationCode } from "../domain/AuthorizationCode";

import { authorizationCodeSchema, StoreMapSchema } from "../schema/AuthSchema";

const STORE_PATH = path.resolve(
  __dirname,
  "../data/authorizationCodeStore.json"
);

import { AuthorizationRepository } from "../repositories/AuthorizationCodeRepository";

export class AuthorizationRepositoryImpl implements AuthorizationRepository {
  //   constructor();
  private async writeStore(data: StoreMapSchema): Promise<void> {
    const dir = path.dirname(STORE_PATH);
    await fs.mkdir(dir, { recursive: true }); //dataフォルダがなかったら自動で作成　また、ファイルがあったら、何もしない
    await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  private async readStore(): Promise<StoreMapSchema> {
    try {
      const buf = await fs.readFile(STORE_PATH, "utf-8");
      const parsed = JSON.parse(buf);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (err: any) {
      if (err.code === "ENOENT") {
        await this.writeStore({});
        return {};
      }
      throw err;
    }
  }

  async delete(value: string): Promise<void> {
    const store = await this.readStore();
    if (store[value]) {
      delete store[value];
      await this.writeStore(store);
    }
  }

  async lookUpClient(clientId: number): Promise<Client | null> {
    const client = clientData.client.find(
      (client) => client.client_id === clientId
    );
    if (!client) {
      return null;
    }
    return new Client(
      client.client_id,
      client.client_name,
      client.redirect_urls
    );
  }
  async lookupUser(login_id: string, password: string): Promise<User | null> {
    const user = userData.user.find(
      (user) => user.login_id === login_id && user.password === password
    );
    if (!user) {
      return null;
    }

    return User.create(user.user_id, user.login_id, user.password);
  }

  async filterScopes(valueScopes: string[]): Promise<string> {
    if (!valueScopes || valueScopes.length === 0) {
      // valueScopes === null にした方がいい？
      throw new Error("権限がありません");
    }

    const scope = valueScopes.filter((value1) => {
      return SupportedScopes.find((value2) => {
        return value1 === value2;
      });
    });
    return scope.join(" ");
  }

  async save(value: AuthorizationCode): Promise<void> {
    const store = await this.readStore();
    const item: authorizationCodeSchema = {
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
