"use client";

import type { Filter, Sort } from "@/lib/todo";

type Props = {
  filter: Filter; onFilter: (f: Filter) => void;
  query: string; onQuery: (q: string) => void;
  sort: Sort; onSort: (s: Sort) => void;
  counts: Record<Filter, number>;
};

const tabs: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export default function FilterBar({ filter, onFilter, query, onQuery, sort, onSort, counts }: Props) {
  return (
    <div className="filters">
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={filter === t.id} className={filter === t.id ? "tab on" : "tab"} onClick={() => onFilter(t.id)}>
            {t.label} <span className="count">{counts[t.id]}</span>
          </button>
        ))}
      </div>
      <div className="tools">
        <input className="input" type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Search tasks" aria-label="Search tasks" />
        <select className="input" value={sort} onChange={(e) => onSort(e.target.value as Sort)} aria-label="Sort">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">Priority</option>
          <option value="due">Due date</option>
        </select>
      </div>
    </div>
  );
}
