import type { CSSProperties, ReactNode } from "react";

export interface ResponsiveConfigProps {
  breakpoints?: Record<string, number>;
  zIndexScale?: Record<string, number>;
  portalTarget?: HTMLElement | null;
  children: ReactNode;
  className?: string;
}

export function ResponsiveConfig({ breakpoints, zIndexScale, children, className }: ResponsiveConfigProps) {
  const style: CSSProperties = {
    ...(breakpoints
      ? Object.fromEntries(Object.entries(breakpoints).map(([key, value]) => [`--bp-${key}`, `${value}px`]))
      : {}),
    ...(zIndexScale
      ? Object.fromEntries(Object.entries(zIndexScale).map(([key, value]) => [`--z-${key}`, String(value)]))
      : {}),
  } as CSSProperties;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
