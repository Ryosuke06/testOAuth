"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
//正直Userのドメイン必要ないな　　すでにMockデータが存在しているので、必ないかもですが、あってもいいかー
class User {
    _user_id;
    _login_id;
    _password;
    constructor(_user_id, _login_id, _password) {
        this._user_id = _user_id;
        this._login_id = _login_id;
        this._password = _password;
        // ここのデバックは絶対に必要ないと感じています。
        if (!_user_id) {
            throw new Error("UserIDがありません");
        }
        if (!_login_id) {
            throw new Error("ログインIDが入力されていません");
        }
        if (!_password) {
            throw new Error("パスワードが入力されていません");
        }
    }
    static create(user_id, login_id, username) {
        return new User(user_id, login_id, username);
    }
    get userId() {
        return this._user_id;
    }
    get loginId() {
        return this._login_id;
    }
    get password() {
        return this._password;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map