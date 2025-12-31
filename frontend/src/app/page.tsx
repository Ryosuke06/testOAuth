"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { homeTypeInput } from "../../schema/AuthSchema";
import { handleAuthDecision } from "./actions/post-OAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import clientData from "../../mocks/ClientData.json";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clientId = searchParams.get("client_id");
  const redirectURI = searchParams.get("redirect_uri");
  const scopeParam = searchParams.get("scope") || "";
  const state = searchParams.get("state");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<homeTypeInput>();

  const onSubmit = async (data: homeTypeInput) => {
    const result = await handleAuthDecision(data);

    if (result?.success) {
      alert("成功: " + result.message);
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      }
    } else {
      alert("エラー: " + result?.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="flex justify-center text-xl">Client Application</h2>
        <div className="flex flex-col items-center">
          <h3>{clientData.client[0].client_name}</h3>
          <p className="flex items-center">
            clientId: {clientData.client[0].client_id}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h2>Requested Permissions</h2>
          <div className="flex items-center">
            <ol>
              {clientData.client[0].scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="approve"
                className="block text-sm/6 font-large text-gray-100"
              >
                Approve?
              </label>
              <input type="checkbox" id="approve" {...register("approve")} />

              <input
                type="text"
                id="Login ID"
                placeholder="Login ID"
                className="block w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                required
                {...register("login_id")}
              />
              <input
                type="password"
                id="password"
                placeholder="password"
                className="block w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                required
                {...register("password")}
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={<div className="p-4 text-center text-gray-200">Loading...</div>}
    >
      <Page />
    </Suspense>
  );
}
