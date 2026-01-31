import { useEffect, useRef, type ReactNode } from "react";

export interface AccessibilityHelpersProps {
  focusVisible?: boolean;
  shortcutMap?: Record<string, () => void>;
  ariaLabels?: Record<string, string>;
  trapFocus?: boolean;
  returnFocus?: boolean;
  children: ReactNode;
}

function normalizeShortcut(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function matchesShortcut(event: KeyboardEvent, shortcut: string) {
  const combo = normalizeShortcut(shortcut);
  const parts = combo.split("+");
  const key = event.key.toLowerCase();
  const required = {
    meta: parts.includes("meta") || parts.includes("cmd") || parts.includes("command"),
    ctrl: parts.includes("ctrl") || parts.includes("control"),
    alt: parts.includes("alt") || parts.includes("option"),
    shift: parts.includes("shift"),
  };
  const keyPart = parts.find((part) => !["meta", "cmd", "command", "ctrl", "control", "alt", "option", "shift"].includes(part));
  if (keyPart && keyPart !== key) return false;
  if (required.meta !== event.metaKey) return false;
  if (required.ctrl !== event.ctrlKey) return false;
  if (required.alt !== event.altKey) return false;
  if (required.shift !== event.shiftKey) return false;
  return true;
}

export function AccessibilityHelpers({
  focusVisible = true,
  shortcutMap,
  ariaLabels,
  trapFocus,
  returnFocus,
  children,
}: AccessibilityHelpersProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastActive = useRef<Element | null>(null);
  void ariaLabels;

  useEffect(() => {
    if (!shortcutMap) return;
    const handler = (event: KeyboardEvent) => {
      Object.entries(shortcutMap).forEach(([combo, callback]) => {
        if (matchesShortcut(event, combo)) {
          event.preventDefault();
          callback();
        }
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcutMap]);

  useEffect(() => {
    if (!trapFocus) return;
    lastActive.current = document.activeElement;
    const focusable = containerRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    focusable?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !containerRef.current) return;
      const nodes = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ),
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      if (returnFocus && lastActive.current instanceof HTMLElement) {
        lastActive.current.focus();
      }
    };
  }, [trapFocus, returnFocus]);

  useEffect(() => {
    document.documentElement.dataset.focusVisible = focusVisible ? "true" : "false";
  }, [focusVisible]);

  return <div ref={containerRef}>{children}</div>;
}
