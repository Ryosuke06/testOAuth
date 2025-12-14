import { container } from "tsyringe";
import { AuthorizeUseCase, Info } from "../usecases/AuthorizaUseCase";
import { AuthorizationPresentation } from "../presentation/AuthPresentation";

export const setupContainer = () => {
  container.register<Info>("Info", { useClass: AuthorizeUseCase });
};
