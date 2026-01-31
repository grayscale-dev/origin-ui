import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type ProgressProps = {
  value?: number;
  indeterminate?: boolean;
  type?: "bar" | "ring" | "spinner";
  max?: number;
  label?: string;
  showValue?: boolean;
  state?: "default" | "paused" | "error";
  size?: "sm" | "md" | "lg";
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<NonNullable<ProgressProps["size"]>, string> = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3"
};

export function Progress({
  value = 0,
  indeterminate = false,
  type = "bar",
  max = 100,
  label,
  showValue,
  state = "default",
  size = "md",
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.min(max, Math.max(0, value));
  if (type === "spinner") {
    const spinnerSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5";
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        <span
          className={cn(
            "inline-block animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)]",
            spinnerSize,
          )}
          aria-hidden
        />
      </div>
    );
  }

  if (type === "ring") {
    const radius = size === "sm" ? 12 : size === "lg" ? 22 : 16;
    const circumference = 2 * Math.PI * radius;
    const progress = indeterminate ? circumference * 0.3 : circumference - (clamped / max) * circumference;
    return (
      <div className={cn("inline-flex items-center gap-2 text-sm text-[var(--color-subtle)]", className)} {...props}>
        <svg width={radius * 2 + 8} height={radius * 2 + 8} className="rotate-[-90deg]">
          <circle
            cx={radius + 4}
            cy={radius + 4}
            r={radius}
            stroke="var(--color-border)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx={radius + 4}
            cy={radius + 4}
            r={radius}
            stroke={state === "error" ? "var(--color-danger)" : "var(--color-accent)"}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
          />
        </svg>
        {label && <span>{label}</span>}
        {showValue && <span>{Math.round((clamped / max) * 100)}%</span>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div
        className={cn(
          "w-full rounded-full bg-[var(--color-muted)]",
          sizeStyles[size],
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all",
            state === "error" ? "bg-[var(--color-danger)]" : "bg-[var(--color-accent)]",
            state === "paused" && "opacity-60",
            indeterminate && "w-1/2 animate-pulse",
          )}
          style={indeterminate ? undefined : { width: `${(clamped / max) * 100}%` }}
        />
      </div>
      {showValue && !indeterminate && (
        <div className="text-xs text-[var(--color-subtle)]">{Math.round((clamped / max) * 100)}%</div>
      )}
    </div>
  );
}
