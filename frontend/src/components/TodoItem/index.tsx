// src/components/TodoItem/index.tsx
import React from "react";

export type TodoItemProps = {
  id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: string | null;
  onToggle?: (id: string) => void;
  onEdit?: (item: { id: string; title: string; description?: string; dueDate?: string | null }) => void;
  onDelete?: (id: string) => void;
};

export default function TodoItem({
  id,
  title,
  description,
  isCompleted,
  dueDate,
  onToggle,
  onEdit,
  onDelete
}: TodoItemProps) {
  return (
    <div className="flex items-start gap-4 py-3 border-b last:border-b-0">
      <input
        type="checkbox"
        checked={!!isCompleted}
        onChange={() => onToggle?.(id)}
        className="mt-1 h-4 w-4"
      />
      <div className="flex-1">
        <div className={`font-medium ${isCompleted ? "line-through text-gray-400" : ""}`}>{title}</div>
        {description && <div className="text-sm text-gray-500">{description}</div>}
        {dueDate && <div className="text-xs text-gray-400 mt-1">Due: {new Date(dueDate).toLocaleDateString()}</div>}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => onEdit?.({ id, title, description, dueDate })}
        >
          Edit
        </button>
        <button className="text-sm text-red-600 hover:underline" onClick={() => onDelete?.(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
