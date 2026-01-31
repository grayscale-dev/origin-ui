import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

export function Heading({ level = 2, className, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  const size =
    level === 1
      ? "text-2xl"
      : level === 2
        ? "text-xl"
        : level === 3
          ? "text-lg"
          : level === 4
            ? "text-base"
            : "text-sm";

  return (
    <Tag className={cn("font-semibold text-[var(--color-text)]", size, className)} {...props}>
      {children}
    </Tag>
  );
}
