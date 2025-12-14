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
    value: string,
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

  async makeNewToken(
    value: string,
    userId: number,
    clientId: number,
    scopes: string[]
  ) {
    const newToken = AccessToken.create(userId, clientId, scopes);
    await this.tokenRepository.postToken(newToken);
    await this.authorizationRepository.delete(value);
    return newToken;
  }
}
