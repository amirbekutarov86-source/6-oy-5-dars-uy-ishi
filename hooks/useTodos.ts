"use client";

import { useCallback, useEffect, useState } from "react";
import { loadTodos, saveTodos } from "@/lib/storage";
import { uid, type Priority, type Todo } from "@/lib/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTodos(loadTodos());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveTodos(todos);
  }, [todos, ready]);

  const add = useCallback((title: string, priority: Priority, dueDate?: string) => {
    const t = title.trim();
    if (!t) return;
    setTodos((p) => [{ id: uid(), title: t, done: false, priority, dueDate: dueDate || undefined, createdAt: Date.now() }, ...p]);
  }, []);

  const toggle = useCallback((id: string) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t))), []);
  const remove = useCallback((id: string) => setTodos((p) => p.filter((t) => t.id !== id)), []);
  const update = useCallback((id: string, patch: Partial<Omit<Todo, "id">>) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, ...patch } : t))), []);
  const clearCompleted = useCallback(() => setTodos((p) => p.filter((t) => !t.done)), []);
  const toggleAll = useCallback(() => setTodos((p) => {
    const allDone = p.length > 0 && p.every((t) => t.done);
    return p.map((t) => ({ ...t, done: !allDone }));
  }), []);

  return { todos, ready, add, toggle, remove, update, clearCompleted, toggleAll };
}
