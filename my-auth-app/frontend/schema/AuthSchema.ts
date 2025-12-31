import z, { number } from "zod";

export const HomeInput = z.object({
  login_id: z.string(),
  password: z.string(),
  approve: z.boolean(),
});
export type homeTypeInput = z.infer<typeof HomeInput>;

export const postAuthSchema = z.object({
  client_id: z.number(),
  state: z.string(),
  scopes: z.array(z.string()).nonempty(),
  redirect_uri: z.array(z.string().url()).nonempty(),
  response_type: z.string(),
  login_id: z.string(),
  password: z.string(),
  // Approveボタンが押されたかどうかの判定
  approve: z.boolean(),
});
export type postAuthTypeSchema = z.infer<typeof postAuthSchema>;

export const postRequestToken = z.object({
  grant_type: z.string(),
  code: z.string(),
  client_id: z.number(),
  redirect_uri: z.string().url(),
});
export type postRequestTokenSchema = z.infer<typeof postRequestToken>;

export const authorizationCode = z.object({
  value: z.string(),
  userId: z.number(),
  clientId: z.number(),
  scopes: z.array(z.string()).nonempty(),
  redirectUri: z.string(),
  expiresAt: z.date(), //stringにしなければならないかも？
});
export type authorizationCodeSchema = z.infer<typeof authorizationCode>;

export type StoreMapSchema = Record<string, authorizationCodeSchema>;

export const AccessToken = z.object({
  value: z.string(),
  userId: z.number(),
  clientId: z.number(),
  scopes: z.array(z.string()).nonempty(),
  expiresAt: z.date(),
});
export type accessTokenSchema = z.infer<typeof AccessToken>;
export type StoreAccessTokenSchema = Record<string, accessTokenSchema>;
