//正直Userのドメイン必要ないな　　すでにMockデータが存在しているので、必ないかもですが、あってもいいかー
export class User {
  constructor(
    private _user_id: number,
    private _login_id: string,
    private _password: string
  ) {
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

  static create(user_id: number, login_id: string, username: string) {
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
