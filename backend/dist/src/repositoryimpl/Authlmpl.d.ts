import { Client } from "../domain/Client";
export declare class AuthorizationRepositoryImpl {
    lookUpClient(clientId: number): Promise<Client>;
    filterScopes(valueScopes: string[]): Promise<string[]>;
}
//# sourceMappingURL=Authlmpl.d.ts.map