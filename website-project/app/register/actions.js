"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const registerSchema = z
  .object({
    username: z.string().nonempty("Username is required"),
    name: z.string().nonempty("Name is required"),
    lastname: z.string().nonempty("Last Name is required"),
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

  const { username, name, lastname, email, password } = parsed.data;

  try {
    await connectToDB();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return {
        errors: {
          email: ["Email already in use"],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    redirect("/login");
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;

    console.error("REGISTER ERROR:", error);
    return {
      errors: {
        email: ["An unexpected error occurred"],
      },
    };
  }
}
