import AuthorizationCode = require("../domain/AuthorizationCode");
export interface IAuthorizationCodeRepository {
    save(authCode: AuthorizationCode.AuthorizationCode): Promise<void>;
    findByCode(code: string): Promise<AuthorizationCode.AuthorizationCode | null>;
}
//# sourceMappingURL=IAuthorizationCodeRepository.d.ts.map