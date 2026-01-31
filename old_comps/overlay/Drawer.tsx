import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface DrawerProps {
  open: boolean;
  side?: "left" | "right" | "top" | "bottom";
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  dismissOnBackdrop?: boolean;
  dismissible?: boolean;
  snapPoints?: number[];
  defaultSnap?: number;
  width?: number | string;
  className?: string;
}

export function Drawer({
  open,
  side = "right",
  title,
  description,
  content,
  children,
  onClose,
  onOpenChange,
  dismissOnBackdrop = true,
  dismissible = true,
  snapPoints,
  defaultSnap = 0.5,
  width = 420,
  className,
}: DrawerProps) {
  const sideClasses: Record<NonNullable<DrawerProps["side"]>, string> = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  };

  const resolvedContent = children ?? content;
  const resolvedDismiss = dismissible && dismissOnBackdrop;
  const snapValue = snapPoints?.[0] ?? defaultSnap;
  const snapSize = typeof snapValue === "number" ? `${snapValue * 100}vh` : undefined;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose?.();
          onOpenChange?.(false);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[var(--color-overlay)]" />
        <Dialog.Content
          className={cn(
            "fixed z-50 border border-[var(--color-border)] bg-[var(--color-surface)] shadow-strong",
            sideClasses[side],
            className,
          )}
          style={
            side === "left" || side === "right"
              ? { width }
              : { height: snapPoints ? snapSize : width }
          }
          onPointerDownOutside={(event) => {
            if (!resolvedDismiss) event.preventDefault();
          }}
        >
          <div className="border-b border-[var(--color-border)] px-4 py-3">
            <Dialog.Title className={cn("text-sm font-semibold text-[var(--color-text)]", !title && "sr-only")}>
              {title ?? "Drawer"}
            </Dialog.Title>
            <Dialog.Description className={cn("text-xs text-[var(--color-subtle)]", !description && "sr-only")}>
              {description ?? "Drawer content"}
            </Dialog.Description>
          </div>
          <div className="px-4 py-4">{resolvedContent}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
