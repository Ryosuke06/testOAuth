import { Client } from "../domain/Client";

export interface AuthorizationRepository {
  lookUpClient(clientId: number): Promise<Client | null>
  filterScopes(value: string[]): Promise<string>
}
