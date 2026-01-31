import type { ChangeEvent, ReactNode, InputHTMLAttributes } from "react";
import InputMask from "react-input-mask";
import { Input } from "./Input";
import { cn } from "../../utils/cn";

export interface TextInputProps {
  type?: "text" | "search" | "password" | "number" | "email" | "tel" | "url";
  label?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  prefixSlot?: ReactNode;
  suffixSlot?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  mask?: string;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  autoComplete?: string;
  validationState?: "default" | "invalid" | "success";
  helperText?: ReactNode;
  error?: ReactNode;
  id?: string;
  name?: string;
  className?: string;
}

export function TextInput({
  type = "text",
  label,
  value,
  defaultValue,
  onChange,
  onSubmit,
  placeholder,
  prefixSlot,
  suffixSlot,
  disabled,
  readOnly,
  required,
  clearable,
  onClear,
  mask,
  min,
  max,
  step,
  pattern,
  autoComplete,
  validationState = "default",
  helperText,
  error,
  id,
  name,
  className,
}: TextInputProps) {
  const resolvedValidation = error ? "invalid" : validationState;
  const hasError = resolvedValidation === "invalid";
  const hasSuccess = validationState === "success";
  const inputClass = cn(
    hasError && "border-[var(--color-danger)] focus-visible:border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]",
    hasSuccess && "border-[var(--color-success)] focus-visible:border-[var(--color-success)] focus-visible:ring-[var(--color-success)]",
  );
  return (
    <label className={cn("flex w-full flex-col gap-1.5 text-sm text-[var(--color-text)]", className)}>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
          {label}
          {required && <span className="text-[var(--color-danger)]"> *</span>}
        </span>
      )}
      <div className="relative flex items-center gap-2">
        {prefixSlot && <div className="absolute left-3 text-[var(--color-subtle)]">{prefixSlot}</div>}
        {mask ? (
          <InputMask
            mask={mask}
            value={value}
            defaultValue={defaultValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value)}
            disabled={disabled}
          >
            {(inputProps: InputHTMLAttributes<HTMLInputElement>) => (
              <Input
                {...inputProps}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                readOnly={readOnly}
                min={min}
                max={max}
                step={step}
                pattern={pattern}
                autoComplete={autoComplete}
                className={cn(inputClass, prefixSlot && "pl-9", suffixSlot && "pr-9")}
                onKeyDown={(event) => {
                  if (event.key === "Enter") onSubmit?.((event.target as HTMLInputElement).value);
                }}
              />
            )}
          </InputMask>
        ) : (
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            autoComplete={autoComplete}
            className={cn(inputClass, prefixSlot && "pl-9", suffixSlot && "pr-9")}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit?.((event.target as HTMLInputElement).value);
            }}
          />
        )}
        {clearable && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm px-2 py-1 text-xs text-[var(--color-subtle)] hover:bg-[var(--color-muted)]"
          >
            Clear
          </button>
        )}
        {suffixSlot && <div className="absolute right-3 text-[var(--color-subtle)]">{suffixSlot}</div>}
      </div>
      {(helperText || error) && (
        <span className={cn("text-xs", hasError ? "text-[var(--color-danger)]" : "text-[var(--color-subtle)]")}>
          {error ?? helperText}
        </span>
      )}
    </label>
  );
}
