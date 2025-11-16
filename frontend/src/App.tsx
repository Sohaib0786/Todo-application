// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodosPage from "./pages/TodosPage";
import ResetPassword from "./pages/ResetPassword";
import { useAuthStore } from "./features/auth/useAuthStore";

export default function App() {
  const token = useAuthStore((s) => s.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/todos" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/todos" element={token ? <TodosPage /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
