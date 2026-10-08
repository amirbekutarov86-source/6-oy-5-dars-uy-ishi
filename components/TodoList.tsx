import TodoItem from "./TodoItem";
import type { Todo } from "@/lib/todo";

type Props = {
  todos: Todo[];
  emptyText: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export default function TodoList({ todos, emptyText, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">✨</div>
        <p>{emptyText}</p>
      </div>
    );
  }
  return (
    <ul className="list">
      {todos.map((t) => <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />)}
    </ul>
  );
}
