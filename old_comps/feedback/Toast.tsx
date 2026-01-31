import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type ToastTone = "info" | "success" | "warning" | "danger";

export type Toast = {
  id: string;
  title?: string;
  message: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  tone?: ToastTone;
};

interface ToastContextValue {
  toasts: Toast[];
  notify: (toast: Omit<Toast, "id"> & { durationMs?: number }) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback(
    (id: string) => setToasts((current) => current.filter((toast) => toast.id !== id)),
    [],
  );

  const notify: ToastContextValue["notify"] = useCallback(
    ({ durationMs = 3200, ...toast }) => {
      const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      const entry: Toast = {
        id,
        tone: "info",
        dismissible: true,
        ...toast,
        message: toast.message ?? toast.description ?? "",
      };
      setToasts((current) => [...current, entry]);
      window.setTimeout(() => dismiss(id), durationMs);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toasts, notify, dismiss }), [dismiss, notify, toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

function toneClasses(tone: ToastTone = "info") {
  switch (tone) {
    case "success":
      return "border-[color-mix(in_oklab,var(--color-success)_40%,transparent)] bg-[color-mix(in_oklab,var(--color-success)_12%,transparent)]";
    case "warning":
      return "border-[color-mix(in_oklab,var(--color-warning)_40%,transparent)] bg-[color-mix(in_oklab,var(--color-warning)_12%,transparent)]";
    case "danger":
      return "border-[color-mix(in_oklab,var(--color-danger)_40%,transparent)] bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)]";
    default:
      return "border-[var(--color-border)] bg-[var(--color-muted)]";
  }
}

function ToastViewport({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-end px-4 py-6 sm:p-6">
      <div className="flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            data-testid="toast"
            className={cn(
              "pointer-events-auto overflow-hidden rounded-md border shadow-soft",
              "text-[var(--color-text)]",
              toneClasses(toast.tone),
            )}
          >
            <div className="flex items-start gap-3 px-4 py-3">
              <div className="flex-1">
                {toast.title && <p className="text-sm font-semibold">{toast.title}</p>}
                <p className="text-sm text-[var(--color-subtle)]">{toast.message}</p>
                {toast.actionLabel && toast.onAction && (
                  <button
                    type="button"
                    onClick={toast.onAction}
                    className="mt-2 text-xs font-semibold text-[var(--color-accent)]"
                  >
                    {toast.actionLabel}
                  </button>
                )}
              </div>
              {toast.dismissible !== false && (
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  className="text-[var(--color-subtle)] transition hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
