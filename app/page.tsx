"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import ProgressCard from "@/components/ProgressCard";
import ThemeToggle from "@/components/ThemeToggle";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import WelcomeSplash from "@/components/WelcomeSplash";
import { useTodos } from "@/hooks/useTodos";
import { sortTodos, type Filter, type Sort } from "@/lib/todo";

export default function HomePage() {
  const { todos, ready, add, toggle, remove, update, clearCompleted, toggleAll } = useTodos();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const doneCount = todos.filter((t) => t.done).length;
  const counts: Record<Filter, number> = { all: todos.length, active: todos.length - doneCount, completed: doneCount };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = todos.filter((t) => (filter === "all" || (filter === "active" ? !t.done : t.done)) && (!q || t.title.toLowerCase().includes(q)));
    return sortTodos(list, sort);
  }, [todos, filter, query, sort]);

  const emptyText = todos.length === 0 ? "No tasks yet. Add your first one above." : "Nothing matches your filters.";
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

  return (
    <main className="wrap">
      <WelcomeSplash />
      <header className="top rise d1">
        <div>
          <h1>My Tasks</h1>
          <p className="muted" suppressHydrationWarning>{today}</p>
        </div>
        <ThemeToggle />
      </header>

      <div className="rise d2"><ProgressCard total={todos.length} done={doneCount} /></div>
      <div className="rise d3"><TodoForm onAdd={add} /></div>

      <section className="card rise d4">
        <FilterBar filter={filter} onFilter={setFilter} query={query} onQuery={setQuery} sort={sort} onSort={setSort} counts={counts} />
        {ready ? (
          <TodoList todos={visible} emptyText={emptyText} onToggle={toggle} onDelete={remove} onEdit={(id, title) => update(id, { title })} />
        ) : (
          <p className="muted pad">Loading...</p>
        )}
        {todos.length > 0 && (
          <footer className="foot">
            <span className="muted">{counts.active} left</span>
            <div className="foot-actions">
              <button className="link" onClick={toggleAll}>{doneCount === todos.length ? "Mark all active" : "Mark all done"}</button>
              <button className="link danger" onClick={clearCompleted} disabled={doneCount === 0}>Clear completed</button>
            </div>
          </footer>
        )}
      </section>
    </main>
  );
}
