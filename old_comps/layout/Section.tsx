import type { ReactNode } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { cn } from "../../utils/cn";
import { Progress } from "../feedback/Progress";

export interface SectionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  actions?: ReactNode;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
}

export function Section({
  title,
  subtitle,
  collapsible,
  defaultCollapsed,
  actions,
  loading,
  children,
  className,
}: SectionProps) {
  if (!collapsible) {
    return (
      <section className={cn("rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]", className)}>
        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3">
          <div>
            {title && <h2 className="text-sm font-semibold text-[var(--color-text)]">{title}</h2>}
            {subtitle && <p className="text-xs text-[var(--color-subtle)]">{subtitle}</p>}
          </div>
          {actions}
        </div>
        <div className="px-4 py-4">
          {loading ? <Progress type="spinner" size="sm" /> : children}
        </div>
      </section>
    );
  }

  return (
    <Collapsible.Root defaultOpen={!defaultCollapsed} className={cn("rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3">
        <div>
          {title && <h2 className="text-sm font-semibold text-[var(--color-text)]">{title}</h2>}
          {subtitle && <p className="text-xs text-[var(--color-subtle)]">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <Collapsible.Trigger className="rounded-sm border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-subtle)] hover:bg-[var(--color-muted)]">
            Toggle
          </Collapsible.Trigger>
        </div>
      </div>
      <Collapsible.Content className="px-4 py-4">
        {loading ? <Progress type="spinner" size="sm" /> : children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
