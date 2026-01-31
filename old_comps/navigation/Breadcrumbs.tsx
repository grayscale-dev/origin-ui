import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type BreadcrumbItem = {
  id: string;
  label: ReactNode;
  href?: string;
  current?: boolean;
};

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  maxItems?: number;
  onNavigate?: (id: string) => void;
  className?: string;
}

export function Breadcrumbs({ items, maxItems = 5, onNavigate, className }: BreadcrumbsProps) {
  const trimmed =
    items.length > maxItems
      ? [items[0], { id: "ellipsis", label: "…" }, ...items.slice(items.length - (maxItems - 2))]
      : items;

  return (
    <nav aria-label="Breadcrumbs" className={cn("flex flex-wrap items-center gap-2 text-sm text-[var(--color-subtle)]", className)}>
      {trimmed.map((item, index) => (
        <span key={item.id} className="flex items-center gap-2">
          {item.id === "ellipsis" ? (
            <span className="px-1">…</span>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate?.(item.id)}
              className={cn(
                "transition hover:text-[var(--color-text)]",
                item.current && "font-semibold text-[var(--color-text)]",
              )}
            >
              {item.label}
            </button>
          )}
          {index < trimmed.length - 1 && <span className="text-[var(--color-border)]">/</span>}
        </span>
      ))}
    </nav>
  );
}
