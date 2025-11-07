export declare class AuthorizationCode {
    private _value;
    private _userId;
    private _clientId;
    private _scopes;
    private _redirectUrl;
    private _expires_at;
    constructor(_value: string, _userId: number, _clientId: number, _scopes: string[], _redirectUrl: string, _expires_at: Date);
    static create(userId: number, clientId: number, scopes: string[], redirectUri: string): AuthorizationCode;
}
//# sourceMappingURL=AuthorizationCode.d.ts.map