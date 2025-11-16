// src/features/todos/TodoForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../../lib/schemas";
import { z } from "zod";

type Form = z.infer<typeof todoSchema>;

type Props = {
  initial?: Partial<Form>;
  onSubmit: (data: Form) => void | Promise<void>;
  submitLabel?: string;
  onCancel?: () => void;
};

export default function TodoForm({ initial, onSubmit, submitLabel = "Save", onCancel }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Form>({
    resolver: zodResolver(todoSchema),
    defaultValues: { title: initial?.title || "", description: initial?.description || "", dueDate: initial?.dueDate || "" }
  });

  React.useEffect(() => {
    reset({
      title: initial?.title || "",
      description: initial?.description || "",
      dueDate: initial?.dueDate || ""
    });
  }, [initial, reset]);

  return (
    <form onSubmit={handleSubmit(async (d) => { await onSubmit(d); })} className="bg-white p-4 rounded shadow space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input {...register("title")} className="mt-1 block w-full border rounded p-2" />
        {errors.title && <div className="text-sm text-red-600">{errors.title.message}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea {...register("description")} rows={3} className="mt-1 block w-full border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due date</label>
        <input type="date" {...register("dueDate")} className="mt-1 block w-full border rounded p-2" />
      </div>

      <div className="flex gap-2">
        <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
