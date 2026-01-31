import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TooltipProps {
  content: ReactNode;
  variant?: "tooltip" | "hovercard";
  placement?: "top" | "right" | "bottom" | "left";
  delay?: number;
  disabled?: boolean;
  interactive?: boolean;
  children: ReactNode;
  className?: string;
}

export function Tooltip({
  content,
  variant = "tooltip",
  placement = "top",
  delay = 200,
  disabled,
  interactive,
  children,
  className,
}: TooltipProps) {
  if (disabled) return <>{children}</>;
  if (variant === "hovercard") {
    return (
      <HoverCardPrimitive.Root openDelay={delay}>
        <HoverCardPrimitive.Trigger asChild>{children}</HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          side={placement}
          sideOffset={8}
          className={cn(
            "z-50 max-w-xs rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] shadow-strong",
            interactive && "pointer-events-auto",
            className,
          )}
        >
          {content}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    );
  }
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={placement}
          sideOffset={6}
          className={cn(
            "z-50 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs text-[var(--color-text)] shadow-strong",
            className,
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
