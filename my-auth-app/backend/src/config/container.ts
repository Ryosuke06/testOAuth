import { container } from "tsyringe";
import { AuthorizeUseCase, Info } from "../usecases/AuthorizaUseCase";
import { AuthorizationPresentation } from "../presentation/AuthPresentation";
import { AuthorizationRepository } from "../repositories/AuthorizationCodeRepository";
import { AuthorizationRepositoryImpl } from "../repositoryimpl/Authlmpl";
import { TokenRepository } from "../repositories/TokenRepository";
import { TokenRepositoryImpl } from "../repositoryimpl/Tokenlmple";

export const setupContainer = () => {
  container.register<AuthorizationRepository>("AuthorizationRepository", {
    useClass: AuthorizationRepositoryImpl,
  });
  container.register<TokenRepository>("TokenRepository", {
    useClass: TokenRepositoryImpl,
  });
  container.register<Info>("Info", { useClass: AuthorizeUseCase });
};
