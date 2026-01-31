import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Button } from "../forms/Button";

export type SnackbarType = "info" | "success" | "warning" | "danger";

export interface SnackbarProps {
  message: ReactNode;
  type?: SnackbarType;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const toneStyles: Record<SnackbarType, string> = {
  info: "border-[var(--color-border)] bg-[var(--color-surface)]",
  success: "border-[var(--color-success)] bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)]",
  warning: "border-[var(--color-warning)] bg-[color-mix(in_oklab,var(--color-warning)_12%,transparent)]",
  danger: "border-[var(--color-danger)] bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)]",
};

export function Snackbar({
  message,
  type = "info",
  duration = 4000,
  actionLabel,
  onAction,
  onDismiss,
  className,
}: SnackbarProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div className={cn("flex items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm shadow-soft", toneStyles[type], className)}>
      <div className="text-[var(--color-text)]">{message}</div>
      <div className="flex items-center gap-2">
        {actionLabel && (
          <Button size="sm" variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          className="text-[var(--color-subtle)] hover:text-[var(--color-text)]"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
