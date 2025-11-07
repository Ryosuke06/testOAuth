import Client = require("../domain/Client");
export interface IClientRepository {
    findById(clientId: string): Promise<Client.Client | null>;
}
//# sourceMappingURL=IClientRepository.d.ts.map