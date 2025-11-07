export interface ITokenGenerator {
    generate(): string;
}
export declare class SecureRandom implements ITokenGenerator {
    generate(bytes?: number): string;
}
//# sourceMappingURL=ITokenGenerator.d.ts.map