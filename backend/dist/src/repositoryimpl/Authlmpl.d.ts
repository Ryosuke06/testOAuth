import { Client } from "../domain/Client";
import { User } from "../domain/User";
import { AuthorizationCode } from "../domain/AuthorizationCode";
import { AuthorizationRepository } from "../repositories/AuthorizationCodeRepository";
export declare class AuthorizationRepositoryImpl implements AuthorizationRepository {
    private writeStore;
    private readStore;
    delete(value: string): Promise<void>;
    lookUpClient(clientId: number): Promise<Client | null>;
    lookupUser(login_id: string, password: string): Promise<User | null>;
    filterScopes(valueScopes: string[]): Promise<string>;
    save(value: AuthorizationCode): Promise<void>;
}
//# sourceMappingURL=Authlmpl.d.ts.map