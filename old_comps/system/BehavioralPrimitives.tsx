import { useEffect, type ReactNode } from "react";

export interface BehavioralPrimitivesProps {
  enabled?: boolean;
  target?: HTMLElement | null;
  lockScroll?: boolean;
  restoreFocus?: boolean;
  children: ReactNode;
}

export function BehavioralPrimitives({ enabled = true, lockScroll, restoreFocus, children }: BehavioralPrimitivesProps) {
  useEffect(() => {
    if (!enabled) return;
    const previousOverflow = document.body.style.overflow;
    const previousActive = document.activeElement;
    if (lockScroll) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (lockScroll) {
        document.body.style.overflow = previousOverflow;
      }
      if (restoreFocus && previousActive instanceof HTMLElement) {
        previousActive.focus();
      }
    };
  }, [enabled, lockScroll, restoreFocus]);

  return <>{children}</>;
}
