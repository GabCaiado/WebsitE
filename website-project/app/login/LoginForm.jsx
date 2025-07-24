"use client";

import { useState, useEffect, useActionState } from "react";
import Link from 'next/link';
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { getProviders, signIn } from 'next-auth/react';

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined); {/* initial state undefined for now */}
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <form action={loginAction} className="flex max-w-[300px] flex-col gap-2">
      <div className="flex flex-col gap-2">
        <input id="email" name="email" placeholder="Email" className="p-1 rounded-sm"/>
      </div>
      {state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <div className="flex flex-col gap-2">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="p-1 rounded-sm"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}

    <p className="text-sm text-center mt-3">
      Don't have an account?{" "}
      <Link href="/register" className="text-lime-400 hover:underline">Sign up</Link>
    </p>

    {providers &&
      Object.values(providers).map((provider) => (
        <button
          type="button"
          key={provider.name}
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          className="rounded-full text-white text-sm px-4 py-2 border border-white hover:bg-white hover:text-black transition"
        >
          Sign in with {provider.name}
        </button>
      ))}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="bg-black rounded-md mt-6 mx-24 py-2 transition delay-0 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 hover:text-black">
      Login
    </button>
  );
}