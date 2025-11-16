// src/pages/ResetPassword.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ newPassword: string }>();

  const onSubmit = async (data: { newPassword: string }) => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL as string || "http://localhost:4000/api") + "/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: data.newPassword })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Reset failed");
      alert("Password reset successful — you can login now");
      navigate("/login");
    } catch (e: any) {
      alert(e.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Reset password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700">New password</label>
            <input type="password" {...register("newPassword")} className="mt-1 w-full p-2 border rounded" />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
