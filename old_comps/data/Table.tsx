import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type Column<T> = {
  key: keyof T & string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
};

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  caption?: ReactNode;
  getRowId?: (row: T, index: number) => string | number;
  onRowClick?: (row: T) => void;
  emptyState?: ReactNode;
}

export function DataTable<T>({ columns, data, caption, getRowId, onRowClick, emptyState }: DataTableProps<T>) {
  const rowId = (row: T, index: number) => (getRowId ? getRowId(row, index) : index);

  return (
    <div className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm text-[var(--color-text)]">
          {caption && <caption className="px-4 py-3 text-left text-xs text-[var(--color-subtle)]">{caption}</caption>}
          <thead>
            <tr className="bg-[var(--color-muted)] text-[var(--color-subtle)]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide",
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center",
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-[var(--color-subtle)]">
                  {emptyState || "No results"}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={rowId(row, index)}
                  className={cn(
                    "border-t border-[var(--color-border)] transition hover:bg-[var(--color-muted)]",
                    onRowClick && "cursor-pointer",
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-4 py-3 align-middle text-[var(--color-text)]",
                        column.align === "right" && "text-right",
                        column.align === "center" && "text-center",
                      )}
                    >
                      {column.render ? column.render(row) : (row[column.key] ?? "—").toString()}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
