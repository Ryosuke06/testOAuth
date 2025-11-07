import { AuthorizationRepository } from "../repositories/AuthorizationCodeRepository";
export declare class AuthorizeUseCase {
    private authorizationRepository;
    constructor(authorizationRepository: AuthorizationRepository);
    Authorization(client_id: number, client_name: string, redirect_urls: string[], response_type: string): Promise<Error | undefined>;
}
//# sourceMappingURL=AuthorizaUseCase.d.ts.map