// src/features/todos/TodoList.tsx
import React from "react";
import TodoItem, { TodoItemProps } from "../../components/TodoItem";

type Props = {
  todos: TodoItemProps[];
  onToggle: (id: string) => void;
  onEdit: (item: { id: string; title: string; description?: string; dueDate?: string | null }) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onEdit, onDelete }: Props) {
  if (!todos || todos.length === 0) {
    return <div className="text-gray-500 p-4">No todos yet — add one!</div>;
  }

  return (
    <div className="divide-y bg-white rounded shadow">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          id={t.id}
          title={t.title}
          description={t.description}
          isCompleted={t.isCompleted}
          dueDate={t.dueDate}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
