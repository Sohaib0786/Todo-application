import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export const TodoInputSchema = z.object({
  title: z.string().min(1),
});

export type TodoInput = z.infer<typeof TodoInputSchema>;

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};
