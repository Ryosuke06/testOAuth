"use server";

import { homeTypeInput, postAuthSchema } from "../../../../schema/AuthSchema";
import clientData from "../../../../mocks/ClientData.json";
import { redirect } from "next/dist/server/api-utils";

export const handleAuthDecision = async (FormData: homeTypeInput) => {
  const Authdata = {
    client_id: clientData.client[0].client_id,
    state: "mystate",
    scopes: clientData.client[0].scope,
    redirect_uri: clientData.client[0].redirect_urls,
    response_type: "code",
    login_id: FormData.login_id,
    password: FormData.password,
    approve: FormData.approve,
  };

  const result = postAuthSchema.safeParse(Authdata);

  if (!result.success) {
    console.error("validation failed:", result.error.format());
    return {
      success: false,
      message: `${FormData.approve}入力データが不正or必要なデータが生成されませんでした`,
      errors: Error(),
    };
  }

  try {
    const response = await fetch("http://localhost:3010/decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
      redirect: "manual",
    });

    // 追記
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        return { success: true, message: "redirect", redirectUrl: location };
      }
    }

    const resData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: resData.message || "認証サーバーエラーが発生しました",
      };
    }

    return {
      success: true,
      message: "認証に成功しました",
      redirectUrl: resData.redirect_uri,
    };
  } catch (error) {
    console.error("Backend API Error:", error);
    return {
      success: false,
      message: "サーバーとの通信に失敗しました",
    };
  }
};
