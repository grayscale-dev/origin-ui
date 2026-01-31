import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { Fragment, useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Input } from "./Input";

export type ComboboxOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  group?: string;
};

export interface ComboboxProps {
  label?: ReactNode;
  value?: string | string[] | null;
  defaultValue?: string | string[];
  options: ComboboxOption[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  mode?: "single" | "multi";
  searchable?: boolean;
  query?: string;
  onQueryChange?: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  creatable?: boolean;
  clearable?: boolean;
  maxSelected?: number;
  renderOption?: (option: ComboboxOption) => ReactNode;
  renderValue?: (option: ComboboxOption | ComboboxOption[] | null) => string;
  groupBy?: (option: ComboboxOption) => string | undefined;
  virtualized?: boolean;
  closeOnSelect?: boolean;
  onClear?: () => void;
  className?: string;
}

function groupOptions(options: ComboboxOption[]) {
  const grouped = new Map<string, ComboboxOption[]>();
  options.forEach((option) => {
    const group = option.group || "";
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group)?.push(option);
  });
  return Array.from(grouped.entries());
}

export function Combobox({
  label,
  value,
  defaultValue,
  options,
  onChange,
  placeholder,
  mode = "single",
  searchable = true,
  query,
  onQueryChange,
  loading,
  disabled,
  creatable,
  renderOption,
  renderValue,
  groupBy,
  virtualized,
  closeOnSelect = mode === "single",
  clearable,
  maxSelected,
  onClear,
  className,
}: ComboboxProps) {
  const isMulti = mode === "multi";
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (isMulti ? [] : ""),
  );
  const selectedValue = isMulti ? (value ?? internalValue ?? []) : (value ?? internalValue ?? "");
  const [internalSearch, setInternalSearch] = useState("");
  const search = query ?? internalSearch;
  const groupKey = groupBy ? groupBy : (option: ComboboxOption) => option.group;
  const filteredOptions = options.filter((option) => {
    if (!search) return true;
    return option.label?.toString().toLowerCase().includes(search.toLowerCase());
  });

  const selectedOptions = isMulti
    ? options.filter((option) => (selectedValue as string[]).includes(option.value))
    : [];
  const selectedOption = !isMulti ? options.find((option) => option.value === selectedValue) ?? null : null;
  const selectedText = isMulti
    ? selectedOptions.map((option) => option.label?.toString()).join(", ")
    : selectedOption?.label?.toString() ?? "";
  const selectedValueText = renderValue
    ? renderValue(isMulti ? selectedOptions : selectedOption)
    : selectedText;

  const canCreate = creatable && search && !options.some((option) => option.label?.toString() === search);
  const createdOption: ComboboxOption | null = canCreate
    ? { value: search, label: `Create \"${search}\"` }
    : null;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">{label}</span>}
      <HeadlessCombobox
        value={selectedValue}
        onChange={(next) => {
          if (isMulti) {
            if (maxSelected && (next as string[]).length > maxSelected) return;
            onChange(next as string[]);
            setInternalValue(next as string[]);
            if (closeOnSelect) {
              onQueryChange?.("");
              setInternalSearch("");
            }
          } else {
            onChange(next as string);
            setInternalValue(next as string);
          }
        }}
        multiple={isMulti}
        disabled={disabled}
      >
        <div className="relative">
          <HeadlessCombobox.Input
            as={Input}
            placeholder={placeholder}
            displayValue={() => query ?? selectedValueText}
            onChange={(event) => {
              const next = event.target.value;
              onQueryChange ? onQueryChange(next) : setInternalSearch(next);
            }}
            className={cn("pr-10", !searchable && "cursor-pointer")}
            readOnly={!searchable}
            aria-label={typeof label === "string" ? label : undefined}
          />
          {clearable && ((isMulti && (selectedValue as string[]).length > 0) || (!isMulti && selectedValue)) && (
            <button
              type="button"
              onClick={() => {
                onClear?.();
                const emptyValue = isMulti ? [] : "";
                onChange(emptyValue);
                setInternalValue(emptyValue);
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm px-2 py-1 text-xs text-[var(--color-subtle)] hover:bg-[var(--color-muted)]"
            >
              Clear
            </button>
          )}
          <HeadlessCombobox.Button className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-subtle)]">
            ▾
          </HeadlessCombobox.Button>
        </div>
        <HeadlessCombobox.Options className="mt-1 max-h-64 overflow-auto rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-strong">
          {loading && <div className="px-3 py-2 text-sm text-[var(--color-subtle)]">Loading…</div>}
          {!loading && filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-sm text-[var(--color-subtle)]">No options</div>
          )}
          {virtualized && (
            <div className="px-3 py-2 text-xs text-[var(--color-subtle)]">Virtualized list enabled</div>
          )}
          {createdOption && (
            <HeadlessCombobox.Option
              value={createdOption.value}
              className={({ active }) =>
                cn(
                  "cursor-pointer px-3 py-2 text-sm",
                  active && "bg-[var(--color-muted)]",
                )
              }
            >
              {createdOption.label}
            </HeadlessCombobox.Option>
          )}
          {!loading &&
            groupOptions(
              filteredOptions.map((option) => ({ ...option, group: groupKey(option) || "" })),
            ).map(([group, groupOptions]) => (
              <Fragment key={group || "default"}>
                {group && <div className="px-3 py-2 text-xs font-semibold uppercase text-[var(--color-subtle)]">{group}</div>}
                {groupOptions.map((option) => (
                  <HeadlessCombobox.Option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={({ active, disabled: optDisabled }) =>
                      cn(
                        "cursor-pointer px-3 py-2 text-sm",
                        active && "bg-[var(--color-muted)]",
                        optDisabled && "cursor-not-allowed opacity-60",
                      )
                    }
                  >
                    {renderOption ? renderOption(option) : option.label}
                  </HeadlessCombobox.Option>
                ))}
              </Fragment>
            ))}
        </HeadlessCombobox.Options>
      </HeadlessCombobox>
    </div>
  );
}
