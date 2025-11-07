export declare class AccessToken {
    private _token;
    private _userId;
    private _clientId;
    private _expiresAt;
    constructor(_token: string, _userId: number, _clientId: number, _expiresAt: Date);
    static create(token: string, userId: number, clientId: number): void;
}
//# sourceMappingURL=AccessToken.d.ts.map