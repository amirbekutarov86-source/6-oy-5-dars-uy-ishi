"use client";

import { useState } from "react";
import { formatDue, isOverdue, type Todo } from "@/lib/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  const save = () => {
    const t = draft.trim();
    if (t && t !== todo.title) onEdit(todo.id, t);
    else setDraft(todo.title);
    setEditing(false);
  };

  return (
    <li className={`item ${todo.done ? "done" : ""}`}>
      <button className={`check ${todo.done ? "on" : ""}`} onClick={() => onToggle(todo.id)} aria-label={todo.done ? "Mark as active" : "Mark as done"}>
        {todo.done ? "✓" : ""}
      </button>

      <div className="body">
        {editing ? (
          <input
            className="input edit" autoFocus value={draft} maxLength={120}
            onChange={(e) => setDraft(e.target.value)} onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") { setDraft(todo.title); setEditing(false); }
            }}
          />
        ) : (
          <span className="title" onDoubleClick={() => !todo.done && setEditing(true)}>{todo.title}</span>
        )}
        <div className="tags">
          <span className={`chip p-${todo.priority}`}>{todo.priority}</span>
          {todo.dueDate && <span className={`chip ${isOverdue(todo) ? "overdue" : ""}`}>📅 {formatDue(todo.dueDate)}{isOverdue(todo) ? " · overdue" : ""}</span>}
        </div>
      </div>

      <div className="row-actions">
        {!todo.done && <button className="icon-btn" onClick={() => setEditing(true)} aria-label="Edit task" title="Edit">✏️</button>}
        <button className="icon-btn" onClick={() => onDelete(todo.id)} aria-label="Delete task" title="Delete">🗑️</button>
      </div>
    </li>
  );
}
