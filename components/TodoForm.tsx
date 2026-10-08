"use client";

import { useState, type FormEvent } from "react";
import type { Priority } from "@/lib/todo";

type Props = { onAdd: (title: string, priority: Priority, dueDate?: string) => void };

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [due, setDue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, priority, due);
    setTitle("");
    setDue("");
  };

  return (
    <form className="form card" onSubmit={submit}>
      <input className="input grow" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" aria-label="New task" maxLength={120} />
      <select className="input" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} aria-label="Priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input className="input" type="date" value={due} onChange={(e) => setDue(e.target.value)} aria-label="Due date" />
      <button className="btn" disabled={!title.trim()}>Add task</button>
    </form>
  );
}
