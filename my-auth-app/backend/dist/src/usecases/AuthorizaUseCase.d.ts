import { AuthorizationRepository } from "../repositories/AuthorizationCodeRepository";
import { User } from "../domain/User";
import { AuthorizationCode } from "../domain/AuthorizationCode";
import { TokenRepository } from "../repositories/TokenRepository";
import { authorizationCodeSchema } from "../schema/AuthSchema";
import { AccessToken } from "../domain/AccessToken";
export interface Info {
    findUser(login_id: string, password: string): Promise<User | null>;
    createAuthorizationCode(userId: number, clientId: number, scope: string[], redirectUri: string): Promise<AuthorizationCode>;
    ValidateOAuthParameters(grantType: string, code: string, clientId: number, redirectUri: string): Promise<null>;
    checkCode(code: string, clientId: number, redirectUri: string): Promise<authorizationCodeSchema>;
    makeNewToken(value: string, userId: number, clientId: number, scopes: string[]): Promise<AccessToken>;
}
export declare class AuthorizeUseCase implements Info {
    private authorizationRepository;
    private tokenRepository;
    constructor(authorizationRepository: AuthorizationRepository, tokenRepository: TokenRepository);
    findUser(login_id: string, password: string): Promise<User | null>;
    createAuthorizationCode(userId: number, clientId: number, scope: string[], redirectUri: string): Promise<AuthorizationCode>;
    ValidateOAuthParameters(grantType: string, code: string, clientId: number, redirectUri: string): Promise<null>;
    checkCode(code: string, clientId: number, redirectUri: string): Promise<{
        value: string;
        userId: number;
        clientId: number;
        scopes: string[];
        redirectUri: string;
        expiresAt: Date;
    }>;
    makeNewToken(value: string, userId: number, clientId: number, scopes: string[]): Promise<AccessToken>;
}
//# sourceMappingURL=AuthorizaUseCase.d.ts.map