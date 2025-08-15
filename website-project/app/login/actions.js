"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState, formData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    await connectToDB();

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    return { success: true };

  } catch (error) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("LOGIN ERROR:", error);
    return {
      errors: {
        email: ["An unexpected error occurred"],
      },
    };
  }
}
