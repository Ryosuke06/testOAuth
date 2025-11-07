export declare class Client {
    private _clientId;
    private _clientName;
    private _redirectUris;
    constructor(_clientId: number, _clientName: string, _redirectUris: string[]);
    static create(clientId: number, clientName: string, redirectUri: string[]): Client;
}
//# sourceMappingURL=Client.d.ts.map