import z from "zod";
import { AccessToken } from "../domain/AccessToken";
export declare const postAuthSchema: z.ZodObject<{
    client_id: z.ZodString;
    state: z.ZodString;
    scopes: z.ZodArray<z.ZodString>;
    redirect_uri: z.ZodString;
    response_type: z.ZodString;
    login_id: z.ZodString;
    password: z.ZodString;
    approve: z.ZodBoolean;
}, z.core.$strip>;
export type postAuthTypeSchema = z.infer<typeof postAuthSchema>;
export declare const postRequestToken: z.ZodObject<{
    grant_type: z.ZodString;
    code: z.ZodString;
    client_id: z.ZodNumber;
    redirect_uri: z.ZodString;
}, z.core.$strip>;
export type postRequestTokenSchema = z.infer<typeof postRequestToken>;
export declare const authorizationCode: z.ZodObject<{
    value: z.ZodString;
    userId: z.ZodNumber;
    clientId: z.ZodNumber;
    scopes: z.ZodArray<z.ZodString>;
    redirectUri: z.ZodString;
    expiresAt: z.ZodDate;
}, z.core.$strip>;
export type authorizationCodeSchema = z.infer<typeof authorizationCode>;
export type StoreMapSchema = Record<string, authorizationCodeSchema>;
export type StoreAccessTokenSchema = Record<string, AccessToken>;
//# sourceMappingURL=AuthSchema.d.ts.map