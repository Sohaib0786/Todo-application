// src/features/auth/hooks.ts
import { useCallback } from "react";
import { useAuthStore } from "./useAuthStore";
import * as authApi from "../../api/auth";

export function useAuthActions() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  const signup = useCallback(async (payload: authApi.SignupPayload) => {
    const res = await authApi.signup(payload);
    setAuth(res.token, res.user);
    return res;
  }, [setAuth]);

  const login = useCallback(async (payload: authApi.LoginPayload) => {
    const res = await authApi.login(payload);
    setAuth(res.token, res.user);
    return res;
  }, [setAuth]);

  return { signup, login, logout };
}
