import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  indeterminate?: boolean;
}

export function Checkbox({ label, className, disabled, indeterminate, ...props }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-sm text-[var(--color-text)] cursor-pointer select-none",
        disabled && "opacity-60 cursor-not-allowed",
        className,
      )}
    >
      <input ref={inputRef} type="checkbox" className="peer sr-only" disabled={disabled} {...props} />
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-[6px] border border-[var(--color-border)] bg-[var(--color-muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition",
          "peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)]",
          indeterminate && "border-[var(--color-accent)] bg-[var(--color-accent)]",
          "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--color-bg)]",
        )}
        aria-hidden
      >
        {indeterminate ? (
          <span className="h-0.5 w-2.5 rounded-full bg-white" />
        ) : (
          <svg
            className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 8.5 6.5 11 12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && <span className="leading-tight text-[var(--color-text)]">{label}</span>}
    </label>
  );
}
