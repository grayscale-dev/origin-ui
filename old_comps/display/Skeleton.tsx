import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Button } from "../forms/Button";

export interface SkeletonProps {
  variant?: "skeleton" | "empty" | "error";
  lines?: number;
  media?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  actionsSlot?: ReactNode;
  className?: string;
}

export function Skeleton({
  variant = "skeleton",
  lines = 3,
  media,
  title,
  description,
  actionsSlot,
  className,
}: SkeletonProps) {
  if (variant === "empty" || variant === "error") {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-6",
          variant === "error" && "border-[var(--color-danger)]",
          className,
        )}
      >
        {title && <div className="text-sm font-semibold text-[var(--color-text)]">{title}</div>}
        {description && <div className="text-xs text-[var(--color-subtle)]">{description}</div>}
        {actionsSlot ?? (variant === "error" && <Button size="sm" variant="secondary">Retry</Button>)}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4", className)}>
      {media && <div className="h-24 w-full animate-pulse rounded-md bg-[var(--color-muted)]" />}
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-3 animate-pulse rounded-full bg-[var(--color-muted)]",
            index === 0 && "w-3/4",
            index > 0 && "w-full",
          )}
        />
      ))}
    </div>
  );
}
