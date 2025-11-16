// src/api/auth.ts
import api from "./axios";

export type SignupPayload = { name?: string; email: string; password: string };
export type LoginPayload = { email: string; password: string };

export async function signup(payload: SignupPayload) {
  const res = await api.post("/auth/signup", payload);
  return res.data;
}

export async function login(payload: LoginPayload) {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function forgotPassword(email: string) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}

export async function resetPassword(token: string, newPassword: string) {
  const res = await api.post("/auth/reset-password", { token, newPassword });
  return res.data;
}
