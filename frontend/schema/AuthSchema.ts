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
