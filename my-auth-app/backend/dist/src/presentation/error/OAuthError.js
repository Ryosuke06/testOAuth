"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthError = void 0;
class OAuthError extends Error {
    status;
    error;
    error_description;
    constructor(status, error, error_description) {
        super(error_description);
        this.status = status;
        this.error = error;
        this.error_description = error_description;
        this.name = "OAuthError";
    }
}
exports.OAuthError = OAuthError;
//# sourceMappingURL=OAuthError.js.map