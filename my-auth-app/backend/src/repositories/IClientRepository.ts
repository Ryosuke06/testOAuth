import Client = require("../domain/Client");

export interface IClientRepository {
  findById(clientId: string): Promise<Client.Client | null>;
}
