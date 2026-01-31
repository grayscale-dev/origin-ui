import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface LayoutProps {
  layout?: "grid" | "stack";
  direction?: "row" | "column";
  gap?: number | string;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
  columns?: number;
  minItemWidth?: number | string;
  divider?: boolean;
  className?: string;
  children: ReactNode;
}

export function Layout({
  layout = "stack",
  direction = "column",
  gap = 16,
  align,
  justify,
  wrap,
  columns,
  minItemWidth,
  divider,
  className,
  children,
}: LayoutProps) {
  const style: CSSProperties = {
    gap: typeof gap === "number" ? `${gap}px` : gap,
    alignItems: align,
    justifyContent: justify,
  };

  if (layout === "grid") {
    const width = typeof minItemWidth === "number" ? `${minItemWidth}px` : minItemWidth;
    style.display = "grid";
    style.gridTemplateColumns = columns
      ? `repeat(${columns}, minmax(0, 1fr))`
      : width
        ? `repeat(auto-fit, minmax(${width}, 1fr))`
        : "repeat(auto-fit, minmax(220px, 1fr))";
  } else {
    style.display = "flex";
    style.flexDirection = direction;
    style.flexWrap = wrap ? "wrap" : "nowrap";
  }

  const dividerClass = divider
    ? layout === "grid"
      ? "[&>*]:border [&>*]:border-[var(--color-border)] [&>*]:rounded-md"
      : direction === "row"
        ? "divide-x divide-[var(--color-border)]"
        : "divide-y divide-[var(--color-border)]"
    : "";

  return (
    <div className={cn(dividerClass, className)} style={style}>
      {children}
    </div>
  );
}

export function Grid(props: Omit<LayoutProps, "layout">) {
  return <Layout {...props} layout="grid" />;
}

export function Stack(props: Omit<LayoutProps, "layout">) {
  return <Layout {...props} layout="stack" />;
}

export function Divider({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical"; className?: string }) {
  return (
    <div
      className={cn(
        "bg-[var(--color-border)]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
