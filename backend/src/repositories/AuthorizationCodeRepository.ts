import { AuthorizationCode } from "../domain/AuthorizationCode";
import { Client } from "../domain/Client";
import { User } from "../domain/User";

export interface AuthorizationRepository {
  lookUpClient(clientId: number): Promise<Client | null>;
  lookupUser(login_id: string, password: string): Promise<User | null>;
  filterScopes(value: string[]): Promise<string>;
  save(value: AuthorizationCode): Promise<void>;
  delete(value: string): Promise<void>;
}
