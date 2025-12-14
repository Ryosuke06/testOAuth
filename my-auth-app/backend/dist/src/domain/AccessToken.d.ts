export declare class AccessToken {
    private _value;
    private _userId;
    private _clientId;
    private _scopes;
    private _expiresAt;
    constructor(_value: string, _userId: number, _clientId: number, _scopes: string[], _expiresAt: Date);
    static create(userId: number, clientId: number, scopes: string[]): AccessToken;
    get value(): string;
    get userId(): number;
    get clientId(): number;
    get scopes(): string[];
    get expiresAt(): Date;
}
//# sourceMappingURL=AccessToken.d.ts.map