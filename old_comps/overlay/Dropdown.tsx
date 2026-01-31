import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type DropdownItem = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
  danger?: boolean;
};

export interface DropdownProps {
  label?: string;
  items: DropdownItem[];
  align?: "left" | "right";
  trigger?: (props: { open: boolean; toggle: () => void }) => ReactNode;
}

export function Dropdown({ label = "Menu", items, align = "left", trigger }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const close = () => {
    setOpen(false);
    setFocusedIndex(-1);
  };

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusedIndex((prev) => Math.min(items.length - 1, prev + 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedIndex((prev) => Math.max(0, prev - 1));
      }
      if (event.key === "Enter" && focusedIndex >= 0) {
        const item = items[focusedIndex];
        if (item && !item.disabled) {
          item.onSelect?.();
          close();
        }
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, items, focusedIndex]);

  useEffect(() => {
    if (!open) return;
    const firstEnabled = items.findIndex((item) => !item.disabled);
    setFocusedIndex(firstEnabled);
  }, [open, items]);

  const toggle = () => setOpen((v) => !v);

  const renderTrigger = () => {
    if (trigger) return trigger({ open, toggle });
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] shadow-soft transition hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
      >
        {label}
        <span aria-hidden className="text-[var(--color-subtle)]">▾</span>
      </button>
    );
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {renderTrigger()}
      {open && (
        <div
          role="menu"
          aria-label={typeof label === "string" ? label : "Menu"}
          className={cn(
            "absolute z-30 mt-2 min-w-[220px] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-strong",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {items.map((item, index) => (
            <button
              type="button"
              key={item.key}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                item.onSelect?.();
                close();
              }}
              className={cn(
                "mx-1 my-1 flex w-[calc(100%-0.5rem)] items-center justify-between gap-3 rounded-sm px-3 py-2 text-left text-sm transition",
                focusedIndex === index ? "bg-[var(--color-muted)]" : "hover:bg-[var(--color-muted)]",
                item.disabled ? "opacity-60 cursor-not-allowed" : "text-[var(--color-text)]",
                item.danger && "text-[var(--color-danger)]",
              )}
            >
              <span className="flex items-center gap-2">
                {item.icon && <span className="text-[var(--color-subtle)]">{item.icon}</span>}
                {item.label}
              </span>
              {item.shortcut && <span className="text-xs text-[var(--color-subtle)]">{item.shortcut}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
