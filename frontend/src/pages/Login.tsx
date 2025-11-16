// src/pages/Login.tsx
//import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/schemas";
import { z } from "zod";
import { useAuthActions } from "../features/auth/hooks";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

type Form = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuthActions();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: Form) => {
    try {
      await login(data);
      navigate("/todos");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthForm title="Login" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register("email")} className="mt-1 p-2 w-full border rounded" />
          {errors.email && <div className="text-red-600 text-sm">{errors.email.message}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" {...register("password")} className="mt-1 p-2 w-full border rounded" />
          {errors.password && <div className="text-red-600 text-sm">{errors.password.message}</div>}
        </div>

        <div className="flex items-center justify-between">
          <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
          <div className="text-sm">
            <Link to="/signup" className="text-blue-600 underline">Sign up</Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link to="/forgot" className="text-blue-600 underline">Forgot?</Link>
          </div>
        </div>
      </AuthForm>
    </div>
  );
}
