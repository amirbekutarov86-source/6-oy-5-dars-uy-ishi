import type { Todo } from "./todo";

const KEY = "todo-app:v1";

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(todos));
  } catch {
    /* storage unavailable, keep working in memory */
  }
}
