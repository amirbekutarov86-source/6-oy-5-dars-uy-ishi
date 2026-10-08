export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "active" | "completed";
export type Sort = "newest" | "oldest" | "priority" | "due";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  dueDate?: string; // YYYY-MM-DD
  createdAt: number;
};

const weight: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export function sortTodos(list: Todo[], sort: Sort): Todo[] {
  const out = [...list];
  switch (sort) {
    case "oldest": return out.sort((a, b) => a.createdAt - b.createdAt);
    case "priority": return out.sort((a, b) => weight[a.priority] - weight[b.priority] || b.createdAt - a.createdAt);
    case "due": return out.sort((a, b) => (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999"));
    default: return out.sort((a, b) => b.createdAt - a.createdAt);
  }
}

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const isOverdue = (t: Todo) => !t.done && !!t.dueDate && t.dueDate < todayStr();

export function formatDue(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}
