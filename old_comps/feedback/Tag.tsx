import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

const toneStyles: Record<NonNullable<TagProps["tone"]>, string> = {
  neutral: "border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-text)]",
  accent: "border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-accent)_12%,transparent)] text-[var(--color-accent)]",
  success: "border-[color-mix(in_oklab,var(--color-success)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)] text-[var(--color-success)]",
  warning: "border-[color-mix(in_oklab,var(--color-warning)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-warning)_12%,transparent)] text-[var(--color-warning)]",
  danger: "border-[color-mix(in_oklab,var(--color-danger)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)] text-[var(--color-danger)]",
};

export function Tag({ label, tone = "neutral", size = "md", icon, removable, onRemove, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border",
        size === "sm" && "px-1.5 py-0.5 text-[10px]",
        size === "md" && "px-2 py-0.5 text-xs",
        size === "lg" && "px-2.5 py-1 text-sm",
        toneStyles[tone],
        props.onClick && "cursor-pointer",
        className,
      )}
      {...props}
    >
      {icon}
      {label}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full px-1 text-[var(--color-subtle)] hover:text-[var(--color-text)]"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
