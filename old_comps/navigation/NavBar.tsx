import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type NavBarItem = {
  id: string;
  label: ReactNode;
  href?: string;
  disabled?: boolean;
};

export interface NavBarProps {
  brand?: ReactNode;
  items: NavBarItem[];
  activeItem?: string;
  rightSlot?: ReactNode;
  onNavigate?: (id: string) => void;
  scrolled?: boolean;
  collapsed?: boolean;
  className?: string;
}

export function NavBar({ brand, items, activeItem, rightSlot, onNavigate, scrolled, collapsed, className }: NavBarProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2",
        scrolled && "shadow-soft",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {brand && <div className="text-sm font-semibold text-[var(--color-text)]">{brand}</div>}
        {!collapsed && (
          <div className="flex items-center gap-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate?.(item.id)}
                disabled={item.disabled}
                className={cn(
                  "rounded-sm px-3 py-1.5 text-sm transition",
                  item.id === activeItem
                    ? "bg-[var(--color-muted)] text-[var(--color-text)] font-semibold"
                    : "text-[var(--color-subtle)] hover:bg-[var(--color-muted)] hover:text-[var(--color-text)]",
                  item.disabled && "cursor-not-allowed opacity-60",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {rightSlot && <div className="flex items-center gap-2">{rightSlot}</div>}
    </nav>
  );
}
