export declare class User {
    private _user_id;
    private _login_id;
    private _password;
    constructor(_user_id: number, _login_id: string, _password: string);
    static create(user_id: number, login_id: string, username: string): User;
    get userId(): number;
    get loginId(): string;
    get password(): string;
}
//# sourceMappingURL=User.d.ts.map