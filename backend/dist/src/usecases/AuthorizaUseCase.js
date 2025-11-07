"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeUseCase = void 0;
class AuthorizeUseCase {
    authorizationRepository;
    constructor(authorizationRepository) {
        this.authorizationRepository = authorizationRepository;
    }
    async Authorization(client_id, client_name, redirect_urls, response_type) {
        const client = this.authorizationRepository.lookUpClient(client_id);
        if (client === null) {
            return Error("client_id is wrong.");
        }
        // redirect_uri
        if (redirect_urls === null) {
            return Error('redirect_uri is wor');
        }
        // response_type
        if (response_type !== 'code') {
            return Error('response_type is wrong.');
        }
    }
}
exports.AuthorizeUseCase = AuthorizeUseCase;
//# sourceMappingURL=AuthorizaUseCase.js.map