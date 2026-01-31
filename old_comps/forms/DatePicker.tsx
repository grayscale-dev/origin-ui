import { useMemo, type ReactNode } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker, type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "../../utils/cn";
import { Input } from "./Input";
import { Button } from "./Button";

export interface DatePickerProps {
  value?: Date | DateRange;
  defaultValue?: Date | DateRange;
  onChange: (value?: Date | DateRange) => void;
  mode?: "single" | "range";
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[] | ((date: Date) => boolean);
  placeholder?: string;
  includeTime?: boolean;
  timeFormat?: "12h" | "24h";
  timeValue?: string;
  onTimeChange?: (value: string) => void;
  timeStepMinutes?: number;
  timezone?: string;
  quickJump?: boolean;
  disabled?: boolean;
  error?: ReactNode;
  className?: string;
}

export function DatePicker({
  value,
  defaultValue,
  onChange,
  mode = "single",
  minDate,
  maxDate,
  disabledDates,
  placeholder = "Select date",
  includeTime,
  timeFormat = "24h",
  timeValue,
  onTimeChange,
  timeStepMinutes = 15,
  timezone,
  quickJump = true,
  disabled,
  error,
  className,
}: DatePickerProps) {
  const resolvedValue = value ?? defaultValue;
  const displayValue = useMemo(() => {
    if (!resolvedValue) return "";
    if (mode === "range" && "from" in resolvedValue && resolvedValue.from) {
      const to = resolvedValue.to ? format(resolvedValue.to, "MMM dd, yyyy") : "—";
      return `${format(resolvedValue.from, "MMM dd, yyyy")} – ${to}`;
    }
    if (resolvedValue instanceof Date) {
      return format(resolvedValue, "MMM dd, yyyy");
    }
    return "";
  }, [resolvedValue, mode]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className={cn("flex flex-col gap-1", className)}>
          <Input
            readOnly
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(error && "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]")}
          />
          {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
        </div>
      </Popover.Trigger>
      <Popover.Content align="start" className="z-40 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-strong">
        {mode === "range" ? (
          <DayPicker
            mode="range"
            selected={resolvedValue as DateRange | undefined}
            onSelect={(selected) => onChange(selected as DateRange | undefined)}
            disabled={disabledDates}
            fromDate={minDate}
            toDate={maxDate}
            captionLayout={quickJump ? "dropdown" : "label"}
          />
        ) : (
          <DayPicker
            mode="single"
            selected={resolvedValue as Date | undefined}
            onSelect={(selected) => onChange(selected as Date | undefined)}
            disabled={disabledDates}
            fromDate={minDate}
            toDate={maxDate}
            captionLayout={quickJump ? "dropdown" : "label"}
          />
        )}
        {includeTime && (
          <div className="mt-3 flex items-center gap-2">
            <Input
              type="time"
              value={timeValue}
              onChange={(event) => onTimeChange?.(event.target.value)}
              step={timeStepMinutes * 60}
              className={cn(timeFormat === "12h" && "max-w-[140px]")}
            />
            <Button size="sm" variant="secondary" onClick={() => onChange(undefined)}>
              Clear
            </Button>
          </div>
        )}
        <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-subtle)]">
          <span>{minDate ? `Min: ${format(minDate, "MMM dd, yyyy")}` : "No min"}</span>
          <span>{maxDate ? `Max: ${format(maxDate, "MMM dd, yyyy")}` : "No max"}</span>
          {timezone && <span>{timezone}</span>}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
