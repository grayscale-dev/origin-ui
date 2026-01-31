import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Progress } from "../feedback/Progress";

export interface PageProps {
  title?: ReactNode;
  description?: ReactNode;
  loading?: boolean;
  error?: ReactNode | boolean;
  empty?: ReactNode | boolean;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Page({
  title,
  description,
  loading,
  error,
  empty,
  headerSlot,
  footerSlot,
  children,
  className,
}: PageProps) {
  const hasError = Boolean(error);
  const isEmpty = Boolean(empty);

  let content = children;
  if (loading) {
    content = (
      <div className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-subtle)]">
        <Progress type="spinner" size="sm" />
        Loading content...
      </div>
    );
  } else if (hasError) {
    content = (
      <div className="rounded-md border border-[color-mix(in_oklab,var(--color-danger)_45%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)] px-4 py-3 text-sm text-[var(--color-text)]">
        {typeof error === "boolean" ? "Something went wrong." : error}
      </div>
    );
  } else if (isEmpty) {
    content = (
      <div className="rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-6 text-sm text-[var(--color-subtle)]">
        {typeof empty === "boolean" ? "No data yet." : empty}
      </div>
    );
  }

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      {(title || description || headerSlot) && (
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {title && <h1 className="text-xl font-semibold text-[var(--color-text)]">{title}</h1>}
            {description && <p className="text-sm text-[var(--color-subtle)]">{description}</p>}
          </div>
          {headerSlot}
        </header>
      )}
      <div className="flex flex-col gap-4">{content}</div>
      {footerSlot && <footer>{footerSlot}</footer>}
    </section>
  );
}
