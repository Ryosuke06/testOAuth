import { authorizationCodeSchema } from "../schema/AuthSchema";
import { AccessToken } from "../domain/AccessToken";
import { TokenRepository } from "../repositories/TokenRepository";
export declare class TokenRepositoryImpl implements TokenRepository {
    private writeStore;
    private readStore;
    private delete;
    ValidateOAuthParameters(grantType: string, code: string, clientId: number, redirectUri: string): Promise<void>;
    CheckCode(code: string, clientId: number, redirectUri: string): Promise<authorizationCodeSchema>;
    postToken(accessToken: AccessToken): Promise<void>;
}
//# sourceMappingURL=Tokenlmple.d.ts.map