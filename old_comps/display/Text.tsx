import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  truncate?: boolean;
  clampLines?: number;
}

export function Text({ children, truncate, clampLines, className, style, ...props }: TextProps) {
  const clampStyle = clampLines
    ? ({
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: clampLines,
        overflow: "hidden",
      } as const)
    : undefined;

  return (
    <p
      className={cn(
        "text-sm text-[var(--color-text)]",
        truncate && "truncate",
        className,
      )}
      style={{ ...style, ...clampStyle }}
      {...props}
    >
      {children}
    </p>
  );
}
