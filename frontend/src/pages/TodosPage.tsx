// src/pages/TodosPage.tsx
import React from "react";
import { useTodos } from "../features/todos/useTodos";
import TodoList from "../features/todos/TodoList";
import TodoForm from "../features/todos/TodoForm";
import { useAuthStore } from "../features/auth/useAuthStore";

export default function TodosPage() {
  const { query, create, update, remove, toggle } = useTodos();
  const todos = query.data || [];
  const isLoading = query.isLoading;
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleCreate = async (payload: any) => {
    await create.mutateAsync(payload);
  };

  const handleUpdate = async (payload: any) => {
    await update.mutateAsync(payload);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this todo?")) return;
    await remove.mutateAsync(id);
  };

  const handleToggle = async (id: string) => {
    await toggle.mutateAsync(id);
  };

  const [editing, setEditing] = React.useState<null | { id: string; title: string; description?: string; dueDate?: string | null }>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Todos</h1>
            <div className="text-sm text-gray-600">Signed in as {user?.email}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => logout()} className="px-3 py-2 border rounded">Logout</button>
          </div>
        </div>

        <div className="mb-6">
          <TodoForm
            initial={editing ? { title: editing.title, description: editing.description, dueDate: editing.dueDate || "" } : undefined}
            onSubmit={async (data) => {
              if (editing) {
                await handleUpdate({ id: editing.id, payload: data });
                setEditing(null);
              } else {
                await handleCreate(data);
              }
            }}
            submitLabel={editing ? "Update Todo" : "Add Todo"}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div className="bg-white rounded shadow">
          {isLoading ? (
            <div className="p-4 text-gray-600">Loading todos...</div>
          ) : (
            <TodoList
              todos={todos.map((t: any) => ({
                id: t._id,
                title: t.title,
                description: t.description,
                isCompleted: t.isCompleted,
                dueDate: t.dueDate
              }))}
              onToggle={(id) => handleToggle(id)}
              onEdit={(item) => setEditing(item)}
              onDelete={(id) => handleDelete(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
