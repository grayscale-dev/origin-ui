import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type TabItem = {
  value?: string;
  key?: string;
  label: ReactNode;
  disabled?: boolean;
  content?: ReactNode;
};

export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  activeKey?: string;
  onChange: (value: string) => void;
  variant?: "tabs" | "steps";
  keepAlive?: boolean;
  lazy?: boolean;
  orientation?: "horizontal" | "vertical";
  validationMap?: Record<string, "invalid" | "warning">;
  className?: string;
}

export function Tabs({
  tabs,
  value,
  activeKey,
  onChange,
  variant = "tabs",
  keepAlive = true,
  lazy = false,
  orientation = "horizontal",
  validationMap,
  className,
}: TabsProps) {
  const current = activeKey ?? value ?? tabs[0]?.value ?? tabs[0]?.key ?? "";
  return (
    <TabsPrimitive.Root value={current} onValueChange={onChange} orientation={orientation} className={className}>
      <TabsPrimitive.List
        className={cn(
          "inline-flex gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] p-1",
          orientation === "vertical" ? "flex-col" : "items-center",
        )}
      >
        {tabs.map((tab, index) => {
          const tabValue = tab.value ?? tab.key ?? `${index}`;
          const validation = validationMap?.[tabValue];
          return (
            <TabsPrimitive.Trigger
              key={tabValue}
              value={tabValue}
              disabled={tab.disabled}
              className={cn(
                "rounded-sm px-3 py-1.5 text-sm transition",
                variant === "steps" && "flex items-center gap-2",
                "data-[state=active]:bg-[var(--color-surface)] data-[state=active]:text-[var(--color-text)] data-[state=active]:shadow-soft",
                "text-[var(--color-subtle)] hover:text-[var(--color-text)]",
                tab.disabled && "cursor-not-allowed opacity-60",
                validation === "invalid" && "text-[var(--color-danger)]",
                validation === "warning" && "text-[var(--color-warning)]",
              )}
            >
              {variant === "steps" && (
                <span className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-border)] text-xs",
                  current === tabValue && "border-[var(--color-accent)] text-[var(--color-accent)]",
                  validation === "invalid" && "border-[var(--color-danger)] text-[var(--color-danger)]",
                )}>
                  {index + 1}
                </span>
              )}
              {tab.label}
            </TabsPrimitive.Trigger>
          );
        })}
      </TabsPrimitive.List>
      {tabs.map((tab, index) => {
        const tabValue = tab.value ?? tab.key ?? `${index}`;
        const shouldRender = !lazy || tabValue === current;
        if (!shouldRender) return null;
        if (!keepAlive && tabValue !== current) return null;
        return (
          <TabsPrimitive.Content key={tabValue} value={tabValue} className="mt-4">
            {tab.content}
          </TabsPrimitive.Content>
        );
      })}
    </TabsPrimitive.Root>
  );
}
