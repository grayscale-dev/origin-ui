import type { HTMLAttributes, ReactNode, KeyboardEvent, DragEvent } from "react";
import { cn } from "../../utils/cn";
import { Progress } from "../feedback/Progress";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
  variant?: "card" | "panel" | "callout" | "metric" | "empty";
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  mediaSlot?: ReactNode;
  status?: ReactNode;
  actionsSlot?: ReactNode;
  padded?: boolean;
  interactive?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  onDrag?: (event: DragEvent<HTMLDivElement>) => void;
  href?: string;
}

export function Card({
  variant = "card",
  title,
  description,
  header,
  footer,
  headerSlot,
  footerSlot,
  mediaSlot,
  status,
  actionsSlot,
  padded = true,
  interactive,
  selected,
  disabled,
  loading,
  onClick,
  onDrag,
  href,
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
    card: "bg-[var(--color-surface)]",
    panel: "bg-[var(--color-bg)]",
    callout:
      "bg-[color-mix(in_oklab,var(--color-accent)_8%,var(--color-surface))] border-[color-mix(in_oklab,var(--color-accent)_45%,var(--color-border))]",
    metric: "bg-[var(--color-surface)]",
    empty: "bg-[var(--color-muted)] border-dashed",
  };
  const baseClassName = cn(
    "overflow-hidden rounded-md border border-[var(--color-border)] text-left shadow-soft transition",
    variantStyles[variant],
    interactive && "hover:border-[color-mix(in_oklab,var(--color-border)_40%,var(--color-text)_60%)] hover:bg-[var(--color-muted)]",
    selected && "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]",
    disabled && "pointer-events-none opacity-60",
    className,
  );

  const resolvedHeader = headerSlot ?? header;
  const resolvedFooter = footerSlot ?? footer;

  const content = (
    <>
      {(resolvedHeader || title || description || actionsSlot || status) && (
        <div className={cn("flex items-start justify-between gap-3 border-b border-[var(--color-border)]", padded ? "px-4 py-3" : "px-3 py-2")}>
          <div className="flex flex-col gap-1">
            {resolvedHeader}
            <div className="flex items-center gap-2">
              {title && <h3 className="text-sm font-semibold text-[var(--color-text)]">{title}</h3>}
              {status && <span className="text-xs text-[var(--color-subtle)]">{status}</span>}
            </div>
            {description && <p className="text-xs text-[var(--color-subtle)]">{description}</p>}
          </div>
          {actionsSlot}
        </div>
      )}
      {mediaSlot && <div className={cn("border-b border-[var(--color-border)]", padded ? "px-4 py-3" : "px-3 py-2")}>{mediaSlot}</div>}
      <div className={cn(padded ? "px-4 py-3" : "px-3 py-2", variant === "metric" && "flex flex-col gap-1")}>
        {loading ? <Progress type="spinner" size="sm" /> : children}
      </div>
      {resolvedFooter && (
        <div className={cn("border-t border-[var(--color-border)]", padded ? "px-4 py-3" : "px-3 py-2")}>
          {resolvedFooter}
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a className={baseClassName} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <div
      className={baseClassName}
      onClick={onClick}
      onDrag={onDrag}
      draggable={Boolean(onDrag)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        if (!onClick) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      {...props}
    >
      {content}
    </div>
  );
}

export const Panel = Card;
