import { useMemo, useState, type ReactNode } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import { cn } from "../../utils/cn";
import { Input } from "../forms/Input";
import { Button } from "../forms/Button";
import { Checkbox } from "../forms/Checkbox";

export type TablePagination = {
  pageIndex: number;
  pageSize: number;
  onChange?: (pageIndex: number, pageSize: number) => void;
};

export type RowSelectionState = Record<string, boolean>;

export interface FeatureTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  rows: T[];
  rowKey?: keyof T | ((row: T) => string);
  loading?: boolean;
  emptyState?: ReactNode;
  className?: string;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  sortable?: boolean;
  sort?: SortingState;
  onSort?: (sort: SortingState) => void;
  pagination?: TablePagination;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  searchable?: boolean;
  searchValue?: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  filterable?: boolean;
  filters?: ColumnFiltersState;
  onFiltersChange?: (filters: ColumnFiltersState) => void;
  reorderableRows?: boolean;
  onReorderRows?: (rows: T[]) => void;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  columnReorder?: string[];
  onColumnReorder?: (order: string[]) => void;
  rowActions?: (row: T) => ReactNode;
  bulkActions?: ReactNode;
  onRowClick?: (row: T) => void;
  editable?: boolean;
  inlineEdit?: boolean;
  onEditCell?: (rowIndex: number, columnId: string, value: string) => void;
  virtualized?: boolean;
}

export function FeatureTable<T extends { id?: string | number }>({
  columns,
  rows,
  rowKey,
  loading,
  emptyState,
  className,
  selectable,
  selectedKeys,
  onSelectionChange,
  sortable = true,
  sort,
  onSort,
  pagination,
  rowSelection,
  onRowSelectionChange,
  searchable,
  searchValue,
  searchQuery,
  onSearchChange,
  filterable,
  filters,
  onFiltersChange,
  reorderableRows,
  onReorderRows,
  columnVisibility,
  onColumnVisibilityChange,
  columnReorder,
  onColumnReorder,
  rowActions,
  bulkActions,
  onRowClick,
  editable,
  inlineEdit,
  onEditCell,
  virtualized,
}: FeatureTableProps<T>) {
  const [internalSort, setInternalSort] = useState<SortingState>([]);
  const [internalFilters, setInternalFilters] = useState<ColumnFiltersState>([]);
  const [internalVisibility, setInternalVisibility] = useState<VisibilityState>({});
  const [internalSelection, setInternalSelection] = useState<RowSelectionState>({});
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null);
  const [editValue, setEditValue] = useState("");

  const sortingState = sortable ? sort ?? internalSort : [];
  const filterState = filters ?? internalFilters;
  const visibilityState = columnVisibility ?? internalVisibility;
  const selectionState = rowSelection ?? internalSelection;
  const searchTerm = searchQuery ?? searchValue;

  const resolvedSelection = useMemo(() => {
    if (!selectedKeys) return selectionState;
    return selectedKeys.reduce<RowSelectionState>((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
  }, [selectedKeys, selectionState]);
  const effectiveSelection = selectedKeys ? resolvedSelection : selectionState;

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting: sortingState,
      columnFilters: filterState,
      columnVisibility: visibilityState,
      rowSelection: effectiveSelection,
      globalFilter: searchTerm,
      columnOrder: columnReorder,
      pagination: pagination ? { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize } : undefined,
    },
    getRowId: (row, index) => {
      if (rowKey) {
        if (typeof rowKey === "function") return rowKey(row);
        const key = row[rowKey];
        return key ? String(key) : `${index}`;
      }
      return (row as { id?: string | number }).id?.toString() ?? `${index}`;
    },
    onSortingChange: (next) => {
      if (!sortable) return;
      const value = typeof next === "function" ? next(sortingState) : next;
      onSort ? onSort(value) : setInternalSort(value);
    },
    onColumnFiltersChange: (next) => {
      const value = typeof next === "function" ? next(filterState) : next;
      onFiltersChange ? onFiltersChange(value) : setInternalFilters(value);
    },
    onColumnVisibilityChange: (next) => {
      const value = typeof next === "function" ? next(visibilityState) : next;
      onColumnVisibilityChange ? onColumnVisibilityChange(value) : setInternalVisibility(value);
    },
    onRowSelectionChange: (next) => {
      const value = typeof next === "function" ? next(effectiveSelection) : next;
      onRowSelectionChange ? onRowSelectionChange(value) : setInternalSelection(value);
      if (onSelectionChange) {
        const keys = Object.keys(value).filter((key) => value[key]);
        onSelectionChange(keys);
      }
    },
    onGlobalFilterChange: (value) => onSearchChange?.(String(value)),
    onPaginationChange: (next) => {
      if (!pagination) return;
      const value = typeof next === "function" ? next({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize }) : next;
      pagination.onChange?.(value.pageIndex, value.pageSize);
    },
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(pagination ? { getPaginationRowModel: getPaginationRowModel(), manualPagination: true } : {}),
  });

  const currentRows = table.getRowModel().rows;
  const visibleColumns = table.getVisibleLeafColumns();
  const allowSelection = selectable || Boolean(onRowSelectionChange);
  const extraColumns = (allowSelection ? 1 : 0) + (rowActions ? 1 : 0) + (reorderableRows ? 1 : 0);
  const colSpan = visibleColumns.length + extraColumns;

  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (!onReorderRows) return;
    const next = [...rows];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    onReorderRows(next);
  };

  return (
    <div className={cn("rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] shadow-soft", className)}>
      {(searchable || filterable || columnVisibility || bulkActions) && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
          {bulkActions && allowSelection && Object.values(resolvedSelection).some(Boolean) && (
            <div className="flex items-center gap-2">{bulkActions}</div>
          )}
          {searchable && (
            <Input
              value={searchTerm ?? ""}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Search..."
              className="max-w-xs"
            />
          )}
          {filterable && (
            <Button size="sm" variant="secondary" onClick={() => table.resetColumnFilters()}>
              Clear filters
            </Button>
          )}
          {columnVisibility && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                const next: VisibilityState = {};
                table.getAllLeafColumns().forEach((column) => {
                  next[column.id] = column.getIsVisible();
                });
                onColumnVisibilityChange?.(next);
              }}
            >
              Columns
            </Button>
          )}
          {virtualized && <span className="text-xs text-[var(--color-subtle)]">Virtualized</span>}
        </div>
      )}
      <table className="min-w-full border-collapse text-sm text-[var(--color-text)]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-[var(--color-muted)] text-[var(--color-subtle)]">
              {allowSelection && headerGroup.id === table.getHeaderGroups()[0].id && (
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
                  <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={() => table.toggleAllRowsSelected()}
                  />
                </th>
              )}
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">
                  {sortable ? (
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? "▲" : "▼") : null}
                    </button>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                  {onColumnReorder && columnReorder && (
                    <div className="mt-1 flex gap-1">
                      <button
                        type="button"
                        className="rounded-sm border border-[var(--color-border)] px-1 text-[10px]"
                        onClick={() => {
                          const idx = columnReorder.indexOf(header.column.id);
                          if (idx > 0) {
                            const next = [...columnReorder];
                            [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                            onColumnReorder(next);
                          }
                        }}
                      >
                        ◀
                      </button>
                      <button
                        type="button"
                        className="rounded-sm border border-[var(--color-border)] px-1 text-[10px]"
                        onClick={() => {
                          const idx = columnReorder.indexOf(header.column.id);
                          if (idx < columnReorder.length - 1) {
                            const next = [...columnReorder];
                            [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                            onColumnReorder(next);
                          }
                        }}
                      >
                        ▶
                      </button>
                    </div>
                  )}
                </th>
              ))}
              {rowActions && headerGroup.id === table.getHeaderGroups()[0].id && (
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">Actions</th>
              )}
              {reorderableRows && headerGroup.id === table.getHeaderGroups()[0].id && (
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">Order</th>
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={colSpan} className="px-4 py-6 text-center text-[var(--color-subtle)]">
                Loading...
              </td>
            </tr>
          ) : currentRows.length === 0 ? (
            <tr>
              <td colSpan={colSpan} className="px-4 py-6 text-center text-[var(--color-subtle)]">
                {emptyState ?? "No results"}
              </td>
            </tr>
          ) : (
            currentRows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={cn("border-t border-[var(--color-border)] hover:bg-[var(--color-muted)]", onRowClick && "cursor-pointer")}
                onClick={() => onRowClick?.(row.original)}
              >
                {allowSelection && (
                  <td className="px-3 py-2">
                    <Checkbox checked={row.getIsSelected()} onChange={() => row.toggleSelected()} />
                  </td>
                )}
                {row.getVisibleCells().map((cell) => {
                  const isEditing = editingCell?.rowIndex === rowIndex && editingCell.columnId === cell.column.id;
                  return (
                    <td
                      key={cell.id}
                      className="px-3 py-2"
                      onDoubleClick={() => {
                        if (!(inlineEdit || editable)) return;
                        setEditingCell({ rowIndex, columnId: cell.column.id });
                        setEditValue(String(cell.getValue() ?? ""));
                      }}
                    >
                      {isEditing ? (
                        <Input
                          value={editValue}
                          onChange={(event) => setEditValue(event.target.value)}
                          onBlur={() => {
                            onEditCell?.(rowIndex, cell.column.id, editValue);
                            setEditingCell(null);
                          }}
                        />
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  );
                })}
                {rowActions && <td className="px-3 py-2">{rowActions(row.original)}</td>}
                {reorderableRows && (
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="rounded-sm border border-[var(--color-border)] px-2 text-xs"
                        onClick={() => handleReorder(rowIndex, Math.max(0, rowIndex - 1))}
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        className="rounded-sm border border-[var(--color-border)] px-2 text-xs"
                        onClick={() => handleReorder(rowIndex, Math.min(rows.length - 1, rowIndex + 1))}
                      >
                        Down
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && (
        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3 text-xs text-[var(--color-subtle)]">
          <span>
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => pagination.onChange?.(Math.max(0, pagination.pageIndex - 1), pagination.pageSize)}
            >
              Prev
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => pagination.onChange?.(pagination.pageIndex + 1, pagination.pageSize)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
