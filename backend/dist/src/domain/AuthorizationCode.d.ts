export declare class AuthorizationCode {
    private _value;
    private _userId;
    private _clientId;
    private _scopes;
    private _redirectUri;
    private _expires_at;
    constructor(_value: string, _userId: number, _clientId: number, _scopes: string[], _redirectUri: string, _expires_at: Date);
    static create(userId: number, clientId: number, scopes: string[], redirectUri: string): AuthorizationCode;
    get value(): string;
    get userId(): number;
    get clientId(): number;
    get scopes(): string[];
    get redirectUri(): string;
    get expiresAt(): Date;
}
//# sourceMappingURL=AuthorizationCode.d.ts.map