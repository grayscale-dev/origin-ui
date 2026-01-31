import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inset?: boolean;
};

const baseFieldStyles =
  "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:border-[color-mix(in_oklab,var(--color-border)_60%,var(--color-text)_40%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-[var(--color-accent)] disabled:opacity-60 disabled:cursor-not-allowed";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, inset, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(baseFieldStyles, inset && "bg-[var(--color-muted)] border-[var(--color-muted)] shadow-none", className)}
      {...props}
    />
  );
});

export const fieldStyles = baseFieldStyles;
