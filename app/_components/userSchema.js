import { z } from 'zod';

export const userSchemaRegister = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }).nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).nonempty({ message: "Password is required" }),
});
export const userSchemaLogin = z.object({
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).nonempty({ message: "Password is required" }),
});
