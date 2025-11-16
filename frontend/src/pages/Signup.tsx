// src/pages/Signup.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../lib/schemas";
import { z } from "zod";
import { useAuthActions } from "../features/auth/hooks";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

type Form = z.infer<typeof signupSchema>;

export default function Signup() {
  const { signup } = useAuthActions();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: Form) => {
    try {
      await signup(data);
      navigate("/todos");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthForm title="Create account" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input {...register("name")} className="mt-1 p-2 w-full border rounded" />
          {errors.name && <div className="text-red-600 text-sm">{errors.name.message}</div>}
        </div>

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

        <div className="flex justify-between items-center">
          <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Sign up</button>
          <Link to="/login" className="text-blue-600 underline text-sm">Already have account?</Link>
        </div>
      </AuthForm>
    </div>
  );
}
