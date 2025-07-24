"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

const registerSchema = z
  .object({
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function register(prevState, formData) {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Lógica real de criação aqui
  redirect("/login");
}
