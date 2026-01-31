import * as SliderPrimitive from "@radix-ui/react-slider";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SliderProps {
  mode?: "single" | "range";
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  marks?: number[];
  onChange: (value: number | [number, number]) => void;
  onCommit?: (value: number | [number, number]) => void;
  disabled?: boolean;
  showValue?: boolean;
  formatValue?: (value: number) => ReactNode;
  className?: string;
}

export function Slider({
  mode = "single",
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  marks,
  onChange,
  onCommit,
  disabled,
  showValue,
  formatValue,
  className,
}: SliderProps) {
  const resolved = value ?? defaultValue ?? 0;
  const values = Array.isArray(resolved) ? resolved : [resolved];
  const isRange = mode === "range";
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <SliderPrimitive.Root
        value={values}
        defaultValue={defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : undefined}
        min={min}
        max={max}
        step={step}
        onValueChange={(next) => onChange(isRange ? (next as [number, number]) : next[0])}
        onValueCommit={(next) => onCommit?.(isRange ? (next as [number, number]) : next[0])}
        disabled={disabled}
        className={cn("relative flex w-full touch-none select-none items-center", disabled && "opacity-60")}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-[var(--color-muted)]">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-[var(--color-accent)]" />
        </SliderPrimitive.Track>
        {values.map((val) => (
          <SliderPrimitive.Thumb
            key={val}
            className="block h-4 w-4 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          />
        ))}
      </SliderPrimitive.Root>
      {marks && marks.length > 0 && (
        <div className="flex items-center justify-between text-[10px] text-[var(--color-subtle)]">
          {marks.map((mark) => (
            <span key={mark}>{formatValue ? formatValue(mark) : mark}</span>
          ))}
        </div>
      )}
      {showValue && (
        <div className="flex items-center justify-between text-xs text-[var(--color-subtle)]">
          {values.map((val, index) => (
            <span key={`${val}-${index}`}>{formatValue ? formatValue(val) : val}</span>
          ))}
        </div>
      )}
    </div>
  );
}
