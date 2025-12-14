import { StreamOptions } from "stream";
import { Client } from "../domain/Client";
import { AuthorizationRepository } from "../repositories/AuthorizationCodeRepository";
import { User } from "../domain/User";
import { injectable } from "tsyringe";
import { AuthorizationCode } from "../domain/AuthorizationCode";
import { TokenRepository } from "../repositories/TokenRepository";
import { Numeric } from "zod/v4/core/util.cjs";
import { authorizationCodeSchema } from "../schema/AuthSchema";
import { AccessToken } from "../domain/AccessToken";

export interface Info {
  // Authorization(
  //   client_id: number,
  //   redirect_urls: string[],
  //   response_type: string
  // ): Promise<Client | null>;
  findUser(login_id: string, password: string): Promise<User | null>;
  createAuthorizationCode(
    userId: number,
    clientId: number,
    scope: string[],
    redirectUri: string
  ): Promise<AuthorizationCode>;
  ValidateOAuthParameters(
    grantType: string,
    code: string,
    clientId: number,
    redirectUri: string
  ): Promise<null>;
  checkCode(
    code: string,
    clientId: number,
    redirectUri: string
  ): Promise<authorizationCodeSchema>;
  makeNewToken(
    userId: number,
    clientId: number,
    scopes: string[]
  ): Promise<AccessToken>;
}

@injectable()
export class AuthorizeUseCase implements Info {
  constructor(
    private authorizationRepository: AuthorizationRepository,
    private tokenRepository: TokenRepository
  ) {}
  // async Authorization(
  //   client_id: number,
  //   redirect_urls: string[],
  //   response_type: string
  // ): Promise<Client | null> {
  //   const client = this.authorizationRepository.lookUpClient(client_id);
  //   if (client === null) {
  //     throw new Error("client_id is wrong.");
  //   }

  //   // redirect_uri
  //   if (redirect_urls === null) {
  //     throw new Error("redirect_uri is wor");
  //   }

  //   // response_type
  //   if (response_type !== "code") {
  //     throw new Error("response_type is wrong.");
  //   }
  //   return client;
  // }

  async findUser(login_id: string, password: string): Promise<User | null> {
    const user = this.authorizationRepository.lookupUser(login_id, password);
    return user;
  }

  async createAuthorizationCode(
    userId: number,
    clientId: number,
    scope: string[],
    redirectUri: string
  ): Promise<AuthorizationCode> {
    const auth = AuthorizationCode.create(userId, clientId, scope, redirectUri);
    await this.authorizationRepository.save(auth);
    return auth;
  }

  async ValidateOAuthParameters(
    grantType: string,
    code: string,
    clientId: number,
    redirectUri: string
  ) {
    await this.tokenRepository.ValidateOAuthParameters(
      grantType,
      code,
      clientId,
      redirectUri
    );
    return null;
  }

  async checkCode(code: string, clientId: number, redirectUri: string) {
    return await this.tokenRepository.CheckCode(code, clientId, redirectUri);
  }

  async makeNewToken(userId: number, clientId: number, scopes: string[]) {
    const newToken = AccessToken.create(userId, clientId, scopes);
    await this.tokenRepository.postToken(newToken);
    return newToken;
  }

  // async lookUpClient(
  //   clientId: number,
  // ): Promise<Client | null> {
  //   const client = clientData.client.find((client) => client.client_id === clientId);
  //   if (!client) {
  //     return null;
  //   }
  //   return new Client(client.client_id, client.client_name, client.redirect_urls)
  // }

  // const userId = "user-123";
  // const value = this.tokenGenerator.generate();
  // const scoped = ["read", "write"];
  // const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10分の有効期限

  // const authCode = new AuthorizationCode(
  //   value,
  //   userId,
  //   clientId,
  //   scoped,
  //   redirectUri,
  //   expiresAt
  // );
}
