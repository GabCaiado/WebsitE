"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from 'react';
import Link from 'next/link';
import { register } from '../app/register/actions';

export default function RegisterForm() {
  const [state, formAction] = useActionState(register, undefined);

  return (
    <form action={formAction} className="flex max-w-[300px] flex-col gap-2">
      <div className="flex flex-col gap-2">
        <input className="p-1 rounded-sm" name="username" placeholder="Username" />
      </div>
      {state?.errors?.username && (
        <p className="text-red-500 text-sm">{state.errors.username}</p>
      )}
      <div className="flex flex-col gap-2">
        <input className="p-1 rounded-sm" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}
      <div className="flex flex-col gap-2">
        <input className="p-1 rounded-sm" name="lastname" placeholder="Last Name" />
      </div>
      {state?.errors?.lastname && (
        <p className="text-red-500 text-sm">{state.errors.lastname}</p>
      )}
      <div className="flex flex-col gap-2">
        <input className="p-1 rounded-sm" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}
      <div className="flex flex-col gap-2">
        <input className="p-1 rounded-sm" name="password" type="password" placeholder="Password" />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      <div className="flex flex-col gap-2">
        <input className="p-1 rounded-sm" name="confirmPassword" type="password" placeholder="Confirm Password" />
      </div>
      {state?.errors?.confirmPassword && (
        <p className="text-red-500 text-sm">{state.errors.confirmPassword}</p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-black rounded-md mt-8 mx-24 py-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-lime-300 hover:text-black"
    >
      Sign Up
    </button>
  );
}
