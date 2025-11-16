import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import { TodoInput } from "../../lib/schemas";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => (await api.get("/todos")).data,
  });
}

export function useCreateTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TodoInput) => api.post("/todos", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useToggleTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/todos/${id}/toggle`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useDeleteTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/todos/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
}
