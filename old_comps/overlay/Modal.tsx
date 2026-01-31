import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { cn } from "../../utils/cn";

export interface ModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  footerSlot?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  onConfirm?: () => void;
  dismissOnBackdrop?: boolean;
  dismissOnEsc?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  movable?: boolean;
  draggable?: boolean;
  resizeable?: boolean;
  fullScreen?: boolean;
  fullscreen?: boolean;
  defaultSize?: { width: number; height: number };
  initialSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
  showHeaderControls?: boolean;
}

export function Modal({
  open,
  onOpenChange,
  onClose,
  title,
  description,
  children,
  content,
  footer,
  footerSlot,
  size = "md",
  className,
  onConfirm,
  dismissOnBackdrop = true,
  dismissOnEsc = true,
  closeOnBackdrop,
  closeOnEsc,
  movable,
  draggable,
  resizeable,
  fullScreen,
  fullscreen,
  defaultSize,
  initialSize,
  minSize,
  maxSize,
  defaultPosition,
  showHeaderControls = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElement = useRef<Element | null>(null);
  const resolvedBackdrop = closeOnBackdrop ?? dismissOnBackdrop;
  const resolvedEsc = closeOnEsc ?? dismissOnEsc;
  const resolvedFull = fullscreen ?? fullScreen;
  const resolvedMovable = draggable ?? movable;
  const resolvedFooter = footerSlot ?? footer;

  useEffect(() => {
    if (!open) return;
    lastActiveElement.current = document.activeElement;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape" && resolvedEsc) {
        onClose?.();
        onOpenChange?.(false);
      }
    };
    document.addEventListener("keydown", handler);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = dialogRef.current?.querySelector<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    focusable?.focus();

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = previousOverflow;
      if (lastActiveElement.current instanceof HTMLElement) {
        lastActiveElement.current.focus();
      }
    };
  }, [open, onClose, onOpenChange, resolvedEsc]);

  if (typeof document === "undefined" || !open) return null;

  const body = children ?? content;
  const dialogContent = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === "string" ? title : undefined}
      className={cn(
        "relative z-10 w-full overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-strong",
        size === "sm" && "max-w-md",
        size === "md" && "max-w-xl",
        size === "lg" && "max-w-3xl",
        resolvedFull && "h-[calc(100vh-4rem)] max-w-[calc(100vw-4rem)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] px-5 py-4">
        <div>
          {title && <h2 className="text-base font-semibold text-[var(--color-text)]">{title}</h2>}
          {description && <p className="text-sm text-[var(--color-subtle)]">{description}</p>}
        </div>
        {showHeaderControls && (
          <div className="flex items-center gap-2">
            {onConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-sm border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-subtle)] hover:bg-[var(--color-muted)]"
              >
                Confirm
              </button>
            )}
            {onClose && (
              <button
                type="button"
                onClick={() => {
                  onClose?.();
                  onOpenChange?.(false);
                }}
                className="h-8 w-8 rounded-sm text-[var(--color-subtle)] transition hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                aria-label="Close dialog"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>
      <div className="px-5 py-4 text-[var(--color-text)]">{body}</div>
      {resolvedFooter && <div className="border-t border-[var(--color-border)] px-5 py-4">{resolvedFooter}</div>}
    </div>
  );

  const resizableDefault = initialSize ?? defaultSize ?? { width: 680, height: 480 };
  const resizableMin = minSize ?? { width: 360, height: 240 };
  const resizableMax = maxSize ?? { width: 1200, height: 900 };
  const wrappedDialog = resizeable && !resolvedFull ? (
    <Resizable
      defaultSize={resizableDefault}
      minHeight={resizableMin.height}
      minWidth={resizableMin.width}
      maxHeight={resizableMax.height}
      maxWidth={resizableMax.width}
    >
      {dialogContent}
    </Resizable>
  ) : (
    dialogContent
  );

  const positionedDialog = resolvedMovable && !resolvedFull ? (
    <Draggable handle=".drag-handle" defaultPosition={defaultPosition}>
      <div className="drag-handle cursor-move">{wrappedDialog}</div>
    </Draggable>
  ) : (
    wrappedDialog
  );

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-[var(--color-overlay)] backdrop-blur-sm"
        onClick={resolvedBackdrop ? () => {
          onClose?.();
          onOpenChange?.(false);
        } : undefined}
        aria-hidden
      />
      {positionedDialog}
    </div>,
    document.body,
  );
}
