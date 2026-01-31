import type { DragEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { cn } from "../../utils/cn";
import { Progress } from "../feedback/Progress";

export type FilePreview = {
  name: string;
  url?: string;
  size?: number;
};

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  value?: File[];
  onSelect: (files: File[]) => void;
  onUpload?: (files: File[]) => void;
  onRemove?: (file: File) => void;
  progress?: number;
  previews?: FilePreview[];
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function FileUpload({
  accept,
  multiple,
  maxSize,
  maxFiles,
  value,
  onSelect,
  onUpload,
  onRemove,
  progress,
  previews,
  disabled,
  className,
  children,
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const files = value ?? [];

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    let list = Array.from(selected);
    if (maxSize) list = list.filter((file) => file.size <= maxSize);
    if (maxFiles) list = list.slice(0, maxFiles);
    onSelect(list);
    onUpload?.(list);
  };

  const labels = useMemo(() => {
    if (maxSize) return `Max file size ${(maxSize / 1024 / 1024).toFixed(1)} MB`;
    return "Drop files here or browse";
  }, [maxSize]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label
        className={cn(
          "flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-6 text-sm text-[var(--color-subtle)]",
          dragging && "border-[var(--color-accent)] bg-[color-mix(in_oklab,var(--color-accent)_12%,var(--color-muted))]",
          disabled && "pointer-events-none opacity-60",
        )}
        onDragOver={(event: DragEvent<HTMLLabelElement>) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event: DragEvent<HTMLLabelElement>) => {
          event.preventDefault();
          setDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        {children ?? (
          <>
            <div className="text-sm font-semibold text-[var(--color-text)]">Drop files here or browse</div>
            <div className="text-xs text-[var(--color-subtle)]">{labels}</div>
          </>
        )}
        <input
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>

      {progress !== undefined && (
        <div className="flex items-center gap-3 text-xs text-[var(--color-subtle)]">
          <Progress value={progress} />
          <span>{progress}%</span>
        </div>
      )}

      {(previews?.length || files.length > 0) && (
        <div className="flex flex-col gap-2">
          {(previews ?? files.map((file) => ({ name: file.name, size: file.size }))).map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm"
            >
              <div>
                <div className="font-medium text-[var(--color-text)]">{file.name}</div>
                {file.size && (
                  <div className="text-xs text-[var(--color-subtle)]">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                )}
              </div>
              {value && onRemove && (
                <button
                  type="button"
                  onClick={() => {
                    const match = value.find((entry) => entry.name === file.name);
                    if (match) onRemove(match);
                  }}
                  className="text-xs text-[var(--color-subtle)] hover:text-[var(--color-text)]"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
