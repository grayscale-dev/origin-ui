import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ListItemProps {
  title: ReactNode;
  subtitle?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  left,
  right,
  selected,
  disabled,
  onClick,
  href,
  className,
}: ListItemProps) {
  const Wrapper: "div" | "a" | "button" = href ? "a" : onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      href={href}
      disabled={Wrapper === "button" ? disabled : undefined}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-sm border border-transparent px-3 py-2 text-left transition",
        selected
          ? "border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-text)]"
          : "text-[var(--color-text)] hover:bg-[var(--color-muted)]",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {left}
        <div>
          <div className="text-sm font-medium">{title}</div>
          {subtitle && <div className="text-xs text-[var(--color-subtle)]">{subtitle}</div>}
        </div>
      </div>
      {right}
    </Wrapper>
  );
}
