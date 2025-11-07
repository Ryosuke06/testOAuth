import { AccessToken } from "../domain/AccessToken";
export interface IAccessTokenRepository {
    save(accessToken: AccessToken): Promise<void>;
    findByToken(token: string): Promise<AccessToken | null>;
}
//# sourceMappingURL=IAccessTokenRepository.d.ts.map