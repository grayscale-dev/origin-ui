import type { ReactNode } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { cn } from "../../utils/cn";

export type SplitPane = {
  id: string;
  content: ReactNode;
  collapsible?: boolean;
  locked?: boolean;
};

export interface SplitViewProps {
  orientation?: "horizontal" | "vertical";
  panes: SplitPane[];
  minSizes?: number[];
  defaultSizes?: number[];
  collapsible?: boolean;
  persistKey?: string;
  onResize?: (sizes: number[]) => void;
  className?: string;
}

export function SplitView({
  orientation = "horizontal",
  panes,
  minSizes,
  defaultSizes,
  collapsible,
  persistKey,
  onResize,
  className,
}: SplitViewProps) {
  return (
    <PanelGroup
      direction={orientation}
      className={cn("flex h-full w-full overflow-hidden rounded-md border border-[var(--color-border)]", className)}
      autoSaveId={persistKey}
      onLayout={onResize}
    >
      {panes.map((pane, index) => (
        <Panel
          key={pane.id}
          defaultSize={defaultSizes?.[index]}
          minSize={minSizes?.[index]}
          collapsible={collapsible || pane.collapsible}
          collapsedSize={4}
          order={index}
          className={cn("bg-[var(--color-surface)]", pane.locked && "pointer-events-none")}
        >
          {pane.content}
        </Panel>
      ))}
      {panes.length > 1 &&
        panes.slice(0, -1).map((pane) => (
          <PanelResizeHandle
            key={`${pane.id}-handle`}
            className={cn(
              "flex items-center justify-center bg-[var(--color-border)]",
              orientation === "horizontal" ? "w-px cursor-col-resize" : "h-px cursor-row-resize",
            )}
          >
            <div
              className={cn(
                "rounded-full bg-[var(--color-subtle)]",
                orientation === "horizontal" ? "h-8 w-0.5" : "h-0.5 w-8",
              )}
            />
          </PanelResizeHandle>
        ))}
    </PanelGroup>
  );
}
