import { IAuthorizationCodeRepository } from "../../repositories/IAuthorizationCodeRepository";
import { IClientRepository } from "../../repositories/IClientRepository";
import { ITokenGenerator } from "../services/ITokenGenerator";
export declare class AuthorizeUseCase {
    private clientRepo;
    private authCodeRepo;
    private tokenGenerator;
    constructor(clientRepo: IClientRepository, authCodeRepo: IAuthorizationCodeRepository, tokenGenerator: ITokenGenerator);
    execute(clientId: string, redirectUri: string): Promise<{
        code: string;
    }>;
}
//# sourceMappingURL=AuthorizaUseCase.d.ts.map