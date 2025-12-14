import { Request, Response } from "express";
import {
  postAuthTypeSchema,
  postRequestTokenSchema,
} from "../schema/AuthSchema";
import { AuthorizeUseCase, type Info } from "../usecases/AuthorizaUseCase";
import { inject, injectable } from "tsyringe";

import { AccessTokenDuration } from "../const/site";

@injectable()
export class AuthorizationPresentation {
  constructor(@inject("Info") private AuthorizeUseCase: Info) {}
  async decision(req: Request, res: Response): Promise<Response | void> {
    const request = req.body as postAuthTypeSchema;

    const location = `${request.redirect_uri}?state=${request.state}`;

    if (request.approve === false) {
      return res.redirect(
        302,
        `${location}&error=access_denied&error_description=End-user+authentication-failed.`
      );
    }

    const user = await this.AuthorizeUseCase.findUser(
      request.login_id,
      request.password
    );
    if (user === null) {
      throw new Error("not user");
    }

    // 認可コードを生成して保存する
    const code = await this.AuthorizeUseCase.createAuthorizationCode(
      user.userId,
      req.body.client_id,
      req.body.scopes,
      req.body.redirect_uri
    );

    return res.redirect(302, `${location}&code=${code.value}`);
  }

  async token(req: Request, res: Response): Promise<Response | void> {
    const request = req.body as postRequestTokenSchema;
    // TODO ここにtryをして、HTTPコードを返すように実装する必要ありそう
    await this.AuthorizeUseCase.ValidateOAuthParameters(
      request.grant_type,
      request.code,
      request.client_id,
      request.redirect_uri
    );

    const code = await this.AuthorizeUseCase.checkCode(
      request.code,
      request.client_id,
      request.redirect_uri
    );
    const token = await this.AuthorizeUseCase.makeNewToken(
      code.value,
      code.userId,
      code.clientId,
      code.scopes
    );

    return res.json({
      accessToken: token.value,
      tokenType: "Bearer",
      expiresIn: AccessTokenDuration,
      scope: (token.scopes || []).join(" "),
    });
  }
}
