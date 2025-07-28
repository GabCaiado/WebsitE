"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { getProviders, signIn } from 'next-auth/react';

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  async function handleCredentialsLogin(e) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res.error) setError(res.error);
    else window.location.href = "/";
  }

  return (
    <form onSubmit={handleCredentialsLogin} className="flex max-w-[300px] flex-col gap-2">
      <div className="flex flex-col gap-2">
        <input
          required
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-1 rounded-sm"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{state.errors.password}</p>}

      <div className="flex flex-col gap-2">
        <input
          required
          id="password"
          name="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="p-1 rounded-sm"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{state.errors.password}</p>}

    <p className="text-sm text-center mt-3">
      Don't have an account?{" "}
      <Link href="/register" className="text-lime-400 hover:underline">Sign up</Link>
    </p>

    {providers && providers.google && (
        <button
          type="button"
          onClick={() => signIn(providers.google.id, { callbackUrl: '/' })}
          className="rounded-full text-white text-sm px-4 py-2 border border-white hover:bg-white hover:text-black transition"
        >
          Sign in with {providers.google.name}
        </button>
      )}

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