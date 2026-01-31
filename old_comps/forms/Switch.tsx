import { useCallback } from "react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
}

export function Switch({ checked, onCheckedChange, onChange, label, disabled, loading, id }: SwitchProps) {
  const toggle = useCallback(() => {
    if (disabled || loading) return;
    onCheckedChange(!checked);
    onChange?.(!checked);
  }, [checked, disabled, loading, onCheckedChange, onChange]);

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={typeof label === "string" ? label : undefined}
      disabled={disabled}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      className={cn(
        "group inline-flex items-center gap-2 text-sm text-[var(--color-text)]",
        disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <span
        className={cn(
          "relative inline-flex h-5 w-9 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition",
          checked && "bg-[var(--color-accent)] border-[var(--color-accent)]",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 translate-x-[2px] rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition group-focus-visible:ring-2 group-focus-visible:ring-[var(--color-accent)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[var(--color-bg)]",
            checked && "translate-x-[18px]",
          )}
        />
      </span>
      {loading ? <span className="text-xs text-[var(--color-subtle)]">Loading…</span> : label && <span>{label}</span>}
    </button>
  );
}
