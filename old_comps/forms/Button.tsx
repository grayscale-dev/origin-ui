import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "subtle" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white border border-[var(--color-accent)] shadow-soft hover:bg-[var(--color-accent-strong)] hover:border-[var(--color-accent-strong)]",
  secondary:
    "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-muted)]",
  ghost:
    "bg-transparent text-[var(--color-text)] border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-muted)]",
  subtle:
    "bg-[var(--color-muted)] text-[var(--color-text)] border border-transparent hover:border-[var(--color-border)]",
  danger:
    "bg-[var(--color-danger)] text-white border border-[var(--color-danger)] hover:bg-[#b62324]"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-4 text-base"
};

export function Button({
  className,
  children,
  variant = "primary",
  size = "md",
  loading,
  iconLeft,
  iconRight,
  label,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />}
      {iconLeft}
      <span className="truncate">{children ?? label}</span>
      {iconRight}
    </button>
  );
}
