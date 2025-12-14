import { AccessToken } from "../domain/AccessToken";
import { authorizationCodeSchema } from "../schema/AuthSchema";
export interface TokenRepository {
    ValidateOAuthParameters(grantType: string, code: string, clientId: number, redirectUri: string): Promise<void>;
    CheckCode(code: string, clientId: number, redirectUri: string): Promise<authorizationCodeSchema>;
    postToken(accessToken: AccessToken): Promise<void>;
}
//# sourceMappingURL=TokenRepository.d.ts.map