"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const CreateAccount = () => {
  const searchParams = useSearchParams();

  const clientId = searchParams.get("client_id");
  const redirectURI = searchParams.get("redirect_uri");
  const scope = searchParams.get("scope");
  const state = searchParams.get("state");
  //  const CheckPassword = () => {
  //   const value1 = document.getElementsByClassName("password");
  //   const value2 = document.getElementsByClassName("confirm");

  //   if (value1 === value2) {
  //     return "";
  //   } else {
  //     return (
  //       <p>値が一致しません</p>
  //     )
  //   }
  //  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h2 className="flex justify-center text-xl">Create Account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                autoComplete="name"
                className="block w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 front-medium text-gray-100"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 front-medium text-gray-100"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                required
                autoComplete="current-password"
                className="lock w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500"
                name="password"
              />
              <label
                htmlFor="password"
                className="block text-sm/6 front-medium text-gray-100"
              >
                Password comparison
              </label>
              <input
                type="password"
                id="password"
                required
                autoComplete="current-password"
                className="lock w-full rounded-md bg-white/5 px-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 "
                name="confirm"
              />
              {/* {CheckPassword()} */}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2"
              >
                Create Account
              </button>
            </div>
            <div>
              <p>clientID: {clientId}</p>
              <p>redirectURI: {redirectURI}</p>
              <p>scope: {scope}</p>
              <p>state: {state}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default function Auth() {
  return (
    <Suspense
      fallback={<div className="p-4 text-center text-gray-200">Loading...</div>}
    >
      <CreateAccount />
    </Suspense>
  );
}
