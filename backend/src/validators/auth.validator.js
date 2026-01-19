import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),
  email: z.email("invalid email"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("invalid email"),
  password: z.string().min(6, "password must be at least 6 characters"),
});
