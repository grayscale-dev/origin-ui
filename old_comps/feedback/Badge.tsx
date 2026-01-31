import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  soft?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

const toneStyles: Record<BadgeTone, { solid: string; soft: string }> = {
  neutral: {
    solid: "bg-[var(--color-text)] text-[var(--color-bg)]",
    soft: "bg-[var(--color-muted)] text-[var(--color-text)] border border-[var(--color-border)]"
  },
  accent: {
    solid: "bg-[var(--color-accent)] text-white",
    soft: "bg-[color-mix(in_oklab,var(--color-accent)_10%,transparent)] text-[var(--color-accent)] border border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)]"
  },
  success: {
    solid: "bg-[var(--color-success)] text-white",
    soft: "bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)] text-[var(--color-success)] border border-[color-mix(in_oklab,var(--color-success)_30%,transparent)]"
  },
  warning: {
    solid: "bg-[var(--color-warning)] text-white",
    soft: "bg-[color-mix(in_oklab,var(--color-warning)_15%,transparent)] text-[var(--color-warning)] border border-[color-mix(in_oklab,var(--color-warning)_35%,transparent)]"
  },
  danger: {
    solid: "bg-[var(--color-danger)] text-white",
    soft: "bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)] text-[var(--color-danger)] border border-[color-mix(in_oklab,var(--color-danger)_30%,transparent)]"
  }
};

export function Badge({ tone = "neutral", soft = true, size = "md", icon, className, children, ...props }: BadgeProps) {
  const palette = toneStyles[tone];
  const style = soft ? palette.soft : palette.solid;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        size === "sm" && "px-1.5 py-0.5 text-[10px]",
        size === "md" && "px-2 py-0.5 text-xs",
        size === "lg" && "px-2.5 py-1 text-sm",
        props.onClick && "cursor-pointer",
        style,
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
