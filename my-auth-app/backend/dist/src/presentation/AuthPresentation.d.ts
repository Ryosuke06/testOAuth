import { Request, Response } from "express";
import { type Info } from "../usecases/AuthorizaUseCase";
export declare class AuthorizationPresentation {
    private AuthorizeUseCase;
    constructor(AuthorizeUseCase: Info);
    decision(req: Request, res: Response): Promise<Response | void>;
    token(req: Request, res: Response): Promise<Response | void>;
}
//# sourceMappingURL=AuthPresentation.d.ts.map