"use client";

import { useMemo, useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Input } from "../forms/Input";

export interface AppShellProps {
  sidebar: ReactNode;
  topbar?: ReactNode;
  children: ReactNode;
}

export type NavItem = {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  children?: NavItem[];
};

export function AppShell({ sidebar, topbar, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-4">
      <div className="flex min-h-[calc(100vh-2rem)] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] shadow-soft">
        {sidebar}
        <div className="flex min-w-0 flex-1 flex-col">
          {topbar}
          <main className="flex-1 overflow-auto bg-[var(--color-bg)] px-8 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({
  children,
  className,
  items,
  activeItem,
  activeKey,
  collapsible,
  defaultCollapsed,
  searchable,
  appSwitcherSlot,
  footerSlot,
  onNavigate,
  onToggle,
}: {
  children?: ReactNode;
  className?: string;
  items?: NavItem[];
  activeItem?: string;
  activeKey?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  searchable?: boolean;
  appSwitcherSlot?: ReactNode;
  footerSlot?: ReactNode;
  onNavigate?: (id: string) => void;
  onToggle?: (collapsed: boolean) => void;
}) {
  const resolvedActive = activeKey ?? activeItem;
  const [collapsed, setCollapsed] = useState(Boolean(defaultCollapsed));
  const [query, setQuery] = useState("");
  const hasItems = useMemo(() => Boolean(items && items.length > 0), [items]);
  const isCollapsed = collapsible ? collapsed : false;

  const filteredItems = useMemo(() => {
    if (!items || !query) return items ?? [];
    const match = (label: ReactNode) =>
      typeof label === "string" && label.toLowerCase().includes(query.toLowerCase());
    const filterTree = (nodes: NavItem[]): NavItem[] =>
      nodes
        .map((node) => {
          const childMatches = node.children ? filterTree(node.children) : [];
          if (match(node.label) || childMatches.length > 0) {
            return { ...node, children: childMatches };
          }
          return null;
        })
        .filter(Boolean) as NavItem[];
    return filterTree(items);
  }, [items, query]);

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:flex",
        isCollapsed ? "w-16" : "w-72",
        className,
      )}
    >
      {collapsible && (
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-3">
          <span className={cn("text-xs font-semibold text-[var(--color-subtle)]", isCollapsed && "sr-only")}>Navigation</span>
          <button
            type="button"
            onClick={() => {
              setCollapsed((value) => {
                const next = !value;
                onToggle?.(next);
                return next;
              });
            }}
            className="rounded-sm border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-subtle)] hover:bg-[var(--color-muted)]"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? "»" : "«"}
          </button>
        </div>
      )}
      {appSwitcherSlot && <div className="border-b border-[var(--color-border)] px-3 py-3">{appSwitcherSlot}</div>}
      {searchable && !isCollapsed && (
        <div className="px-3 py-2">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search..." />
        </div>
      )}
      {hasItems ? (
        <div className="flex flex-1 flex-col gap-1 px-2 py-3">
          <SidebarTree
            items={filteredItems}
            activeItem={resolvedActive}
            isCollapsed={isCollapsed}
            onNavigate={onNavigate}
            level={0}
          />
        </div>
      ) : (
        children
      )}
      {footerSlot && <div className="border-t border-[var(--color-border)] px-3 py-3">{footerSlot}</div>}
    </aside>
  );
}

function SidebarTree({
  items,
  activeItem,
  isCollapsed,
  onNavigate,
  level,
}: {
  items: NavItem[];
  activeItem?: string;
  isCollapsed: boolean;
  onNavigate?: (id: string) => void;
  level: number;
}) {
  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-1">
          <button
            type="button"
            disabled={item.disabled}
            onClick={() => onNavigate?.(item.id)}
            className={cn(
              "flex items-center justify-between rounded-sm px-2.5 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]",
              item.id === activeItem
                ? "bg-[var(--color-muted)] font-semibold text-[var(--color-text)]"
                : "text-[var(--color-subtle)] hover:bg-[var(--color-muted)] hover:text-[var(--color-text)]",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
            style={{ paddingLeft: isCollapsed ? undefined : `${level * 12 + 12}px` }}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {!isCollapsed && item.label}
            </span>
            {!isCollapsed && item.badge}
          </button>
          {item.children && item.children.length > 0 && !isCollapsed && (
            <SidebarTree
              items={item.children}
              activeItem={activeItem}
              isCollapsed={isCollapsed}
              onNavigate={onNavigate}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
}

export function SidebarHeader({ title, description, actions }: { title: ReactNode; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] px-4 py-4">
      <div>
        <h1 className="text-base font-semibold">{title}</h1>
        {description && <p className="text-xs text-[var(--color-subtle)]">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function SidebarSection({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <div className="px-3 py-2">
      {title && <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">{title}</div>}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export function SidebarItem({
  active,
  children,
  icon,
  badge,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]",
        active
          ? "bg-[var(--color-muted)] font-semibold text-[var(--color-text)]"
          : "text-[var(--color-subtle)] hover:bg-[var(--color-muted)] hover:text-[var(--color-text)]",
      )}
    >
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
      {badge}
    </button>
  );
}

export function TopBar({ left, right }: { left?: ReactNode; right?: ReactNode }) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
      <div className="flex items-center gap-3 text-sm text-[var(--color-text)]">{left}</div>
      <div className="flex items-center gap-3">{right}</div>
    </header>
  );
}

export function ContentArea({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("flex flex-col gap-4", className)}>{children}</section>;
}
