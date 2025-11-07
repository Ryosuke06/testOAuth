import { AccessToken } from "../domain/AccessToken";

interface Info {
  client_name: string;
  scopes: string[];
}

export class AuthorizationPresentation {
  async getClient(): Promise<Info> {
    const info: Info = {
      client_name: s,
    };
    return info;
  }
}
