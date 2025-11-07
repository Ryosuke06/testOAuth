import crypto from "crypto"

export interface ITokenGenerator {
    generate(): string;
}


export class SecureRandom implements ITokenGenerator {
    generate(bytes = 6): string {
        return crypto.randomBytes(bytes).toString("base64url")
    }
}
