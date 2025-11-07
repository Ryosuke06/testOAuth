"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    _id;
    _username;
    constructor(_id, _username) {
        this._id = _id;
        this._username = _username;
    }
    static create(id, username) {
        return new User(id, username);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map