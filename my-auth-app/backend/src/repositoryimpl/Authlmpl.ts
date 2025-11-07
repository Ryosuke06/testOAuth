import { Client } from "../domain/Client"
import * as clientData from "../mocks/ClientData.json";
import { SupportedScopes } from "../const/site";

export class AuthorizationRepositoryImpl {
  //   constructor();
  async lookUpClient(clientId: number): Promise<Client> {
    const client = clientData.client.find(
      (client) => client.client_id === clientId
    );
    if (!client) {
      throw new Error('client_id is wrong.');
    }
    return new Client(
      client.client_id,
      client.client_name,
      client.redirect_urls
    );
  }

  async filterScopes(valueScopes: string[]): Promise<string[]> {
    if (!valueScopes || valueScopes.length === 0) {
      // valueScopes === null にした方がいい？
      throw new Error("権限がありません");
    }

    const scope = valueScopes.filter((value1) => {
      SupportedScopes.find((value2) => {
        value1 === value2;
      });
    });
    return scope;
  }
}