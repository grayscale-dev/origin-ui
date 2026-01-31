import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type RadioOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export interface RadioGroupProps {
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({ value, options, onChange, className }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root value={value} onValueChange={onChange} className={cn("flex flex-col gap-2", className)}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
          <RadioGroupPrimitive.Item
            value={option.value}
            disabled={option.disabled}
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]",
              "data-[state=checked]:border-[var(--color-accent)] data-[state=checked]:bg-[var(--color-accent)]",
              option.disabled && "opacity-60",
            )}
          >
            <RadioGroupPrimitive.Indicator className="h-2 w-2 rounded-full bg-white" />
          </RadioGroupPrimitive.Item>
          <span className={cn(option.disabled && "opacity-60")}>{option.label}</span>
        </label>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
