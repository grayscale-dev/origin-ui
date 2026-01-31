import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ReactNode, RefObject } from "react";
import { cn } from "../../utils/cn";

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  anchor?: ReactNode;
  anchorRef?: RefObject<HTMLElement>;
  content?: ReactNode;
  items?: { id: string; label: ReactNode; onSelect?: () => void; disabled?: boolean }[];
  renderContent?: () => ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  closeOnSelect?: boolean;
  dismissOnClickOutside?: boolean;
  className?: string;
}

export function Popover({
  open,
  defaultOpen,
  anchor,
  anchorRef,
  content,
  items,
  renderContent,
  placement = "bottom",
  onClose,
  onOpenChange,
  closeOnSelect = true,
  dismissOnClickOutside = true,
  className,
}: PopoverProps) {
  const resolvedContent =
    renderContent?.() ??
    content ?? (
      <div className="flex flex-col gap-1">
        {items?.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onClick={() => {
              item.onSelect?.();
              if (closeOnSelect) {
                onClose?.();
                onOpenChange?.(false);
              }
            }}
            className={cn(
              "rounded-sm px-3 py-2 text-left text-sm text-[var(--color-text)] hover:bg-[var(--color-muted)]",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  return (
    <PopoverPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose?.();
        onOpenChange?.(isOpen);
      }}
    >
      {anchorRef ? (
        <PopoverPrimitive.Anchor ref={anchorRef as RefObject<HTMLDivElement>} />
      ) : (
        <PopoverPrimitive.Trigger asChild>{anchor}</PopoverPrimitive.Trigger>
      )}
      <PopoverPrimitive.Content
        side={placement}
        sideOffset={8}
        className={cn("z-50 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-strong", className)}
        onInteractOutside={(event) => {
          if (!dismissOnClickOutside) {
            event.preventDefault();
          }
        }}
      >
        {resolvedContent}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}
