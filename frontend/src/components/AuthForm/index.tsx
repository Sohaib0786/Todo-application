// src/components/AuthForm/index.tsx
import React from "react";

type Props = {
  title?: string;
  children?: React.ReactNode;
  onSubmit?: React.FormEventHandler;
};

export default function AuthForm({ title, children, onSubmit }: Props) {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {children}
      </form>
    </div>
  );
}
