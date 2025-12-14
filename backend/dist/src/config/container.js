"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupContainer = void 0;
const tsyringe_1 = require("tsyringe");
const AuthorizaUseCase_1 = require("../usecases/AuthorizaUseCase");
const Authlmpl_1 = require("../repositoryimpl/Authlmpl");
const Tokenlmple_1 = require("../repositoryimpl/Tokenlmple");
const setupContainer = () => {
    tsyringe_1.container.register("AuthorizationRepository", {
        useClass: Authlmpl_1.AuthorizationRepositoryImpl,
    });
    tsyringe_1.container.register("TokenRepository", {
        useClass: Tokenlmple_1.TokenRepositoryImpl,
    });
    tsyringe_1.container.register("Info", { useClass: AuthorizaUseCase_1.AuthorizeUseCase });
};
exports.setupContainer = setupContainer;
//# sourceMappingURL=container.js.map