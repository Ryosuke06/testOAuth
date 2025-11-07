import { Client } from "../domain/Client";
import { AuthorizationRepository } from "../repositories/AuthorizationCodeRepository";

export interface Info {
  Authorization(
    client_id: number,
    redirect_urls: string[],
    response_type: string
  ): Promise<Client | null>;
}

export class AuthorizeUseCase implements Info {
  constructor(private authorizationRepository: AuthorizationRepository) {}
  async Authorization(
    client_id: number,
    redirect_urls: string[],
    response_type: string
  ): Promise<Client | null> {
    const client = this.authorizationRepository.lookUpClient(client_id);
    if (client === null) {
      throw new Error("client_id is wrong.");
    }

    // redirect_uri
    if (redirect_urls === null) {
      throw new Error("redirect_uri is wor");
    }

    // response_type
    if (response_type !== "code") {
      throw new Error("response_type is wrong.");
    }
    return client;
  }

  // async lookUpClient(
  //   clientId: number,
  // ): Promise<Client | null> {
  //   const client = clientData.client.find((client) => client.client_id === clientId);
  //   if (!client) {
  //     return null;
  //   }
  //   return new Client(client.client_id, client.client_name, client.redirect_urls)
  // }

  // const userId = "user-123";
  // const value = this.tokenGenerator.generate();
  // const scoped = ["read", "write"];
  // const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10分の有効期限

  // const authCode = new AuthorizationCode(
  //   value,
  //   userId,
  //   clientId,
  //   scoped,
  //   redirectUri,
  //   expiresAt
  // );
}
