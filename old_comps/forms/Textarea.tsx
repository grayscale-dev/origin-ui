import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { fieldStyles } from "./Input";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  rows?: number;
  autoResize?: boolean;
  maxLength?: number;
  mode?: "plain" | "rich";
  toolbar?: ReactNode | boolean;
  onChange?: (value: string) => void;
  validationState?: "default" | "invalid" | "success";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    className,
    rows = 4,
    value,
    defaultValue,
    autoResize,
    maxLength,
    mode = "plain",
    toolbar = true,
    onChange,
    validationState = "default",
    disabled,
    ...props
  },
  ref,
) {
  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  const [richValue, setRichValue] = useState(defaultValue ?? "");
  const resolvedValue = value ?? richValue;

  useEffect(() => {
    if (!autoResize || !internalRef.current) return;
    const el = internalRef.current;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize, resolvedValue]);

  if (mode === "rich") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
          {toolbar && toolbar !== true ? (
            <div className="border-b border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-subtle)]">
              {toolbar}
            </div>
          ) : toolbar ? (
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-2 py-1">
              <button
                type="button"
                className="rounded-sm px-2 py-1 text-xs text-[var(--color-subtle)] hover:bg-[var(--color-muted)]"
                onClick={() => document.execCommand("bold")}
              >
                Bold
              </button>
              <button
                type="button"
                className="rounded-sm px-2 py-1 text-xs text-[var(--color-subtle)] hover:bg-[var(--color-muted)]"
                onClick={() => document.execCommand("italic")}
              >
                Italic
              </button>
              <button
                type="button"
                className="rounded-sm px-2 py-1 text-xs text-[var(--color-subtle)] hover:bg-[var(--color-muted)]"
                onClick={() => document.execCommand("underline")}
              >
                Underline
              </button>
            </div>
          ) : null}
          <div
            contentEditable={!disabled}
            suppressContentEditableWarning
            className={cn(
              "min-h-[120px] px-3 py-2 text-sm text-[var(--color-text)] outline-none",
              validationState === "invalid" && "border-[var(--color-danger)]",
            )}
            onInput={(event) => {
              const next = (event.target as HTMLDivElement).innerHTML;
              setRichValue(next);
              onChange?.(next);
            }}
            dangerouslySetInnerHTML={{ __html: resolvedValue }}
          />
        </div>
      </div>
    );
  }

  return (
    <textarea
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        if (ref && typeof ref === "object") ref.current = node;
      }}
      className={cn(
        fieldStyles,
        "min-h-[120px]",
        validationState === "invalid" && "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]",
        className,
      )}
      rows={rows}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(event.target.value)}
      maxLength={maxLength}
      disabled={disabled}
      {...props}
    />
  );
});
