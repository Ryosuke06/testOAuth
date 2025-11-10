"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clientId = searchParams.get("client_id");
  const redirectURI = searchParams.get("redirect_uri");
  const scopeParam = searchParams.get("scope") || "";
  const state = searchParams.get("state");

  const scopes = scopeParam
    ?.replace(/\s+/g, "+")
    .split("+")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="flex justify-center text-xl">Client Application</h2>
        <div className="flex flex-col items-center">
          <h3>My Client</h3>
          <p className="flex items-center">clientId: {clientId}</p>
        </div>

        <div className="flex flex-col items-center">
          <h2>Requested Permissions</h2>
          <div className="flex items-center">
            <ol>
              {scopes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="Approve"
                className="block text-sm/6 font-large text-gray-100"
              >
                Approve?
              </label>
              <input
                type="text"
                id="Login ID"
                placeholder="Login ID"
                className="block w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                required
              />
              <input
                type="password"
                id="password"
                placeholder="password"
                className="block w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                required
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

        {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 front-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2"
              >
                SIgn in
              </button>
            </div>
          </form>
          <div className="py-2">
            <button
              type="button"
              onClick={() => router.push("create-account")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border border-blue-700 rounded size-sm"
            >
              CreateAccount
            </button>
          </div>
        </div> */}
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
