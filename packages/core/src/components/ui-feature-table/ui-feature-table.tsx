import { Component, Event, h, Prop, State } from "@stencil/core";
import type { EventEmitter, VNode } from "@stencil/core";

type Renderable = string | number | boolean | null | undefined | Element | Node | VNode;

export type FeatureTableColumn = {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
  render?: (row: Record<string, unknown>) => Renderable;
};

export type FeatureTableFilterOption = {
  value: string;
  label: string;
};

export type FeatureTableFilter = {
  key: string;
  label: string;
  options: FeatureTableFilterOption[];
  value?: string;
};

export type FeatureTablePagination = {
  pageIndex: number;
  pageSize: number;
  total?: number;
};

type SortState = { key: string; direction: "asc" | "desc" };

@Component({
  tag: "signal-feature-table",
  styleUrl: "ui-feature-table.css",
  shadow: true,
})
export class SignalFeatureTable {
  @Prop() columns: FeatureTableColumn[] = [];
  @Prop() rows: Record<string, unknown>[] = [];
  @Prop() caption?: string;
  @Prop() rowKey?: string | ((row: Record<string, unknown>) => string);
  @Prop({ reflect: true }) searchable = false;
  @Prop({ reflect: true }) filterable = false;
  @Prop({ reflect: true }) selectable = false;
  @Prop() selectedKeys: string[] = [];
  @Prop() pagination?: FeatureTablePagination;
  @Prop() emptyText = "No results";
  @Prop() filters: FeatureTableFilter[] = [];
  @Prop({ reflect: true }) loading = false;

  @State() searchQuery = "";
  @State() internalSort?: SortState;
  @State() internalFilters: Record<string, string> = {};
  @State() internalSelection: Record<string, boolean> = {};

  @Event({ eventName: "rowClick", bubbles: true, composed: true })
  rowClick!: EventEmitter<{ row: Record<string, unknown> }>;
  @Event({ eventName: "selectionChanged", bubbles: true, composed: true })
  selectionChanged!: EventEmitter<{ keys: string[] }>;
  @Event({ eventName: "sortChange", bubbles: true, composed: true })
  sortChange!: EventEmitter<{ sort?: { key: string; direction: "asc" | "desc" } }>;
  @Event({ eventName: "filterChange", bubbles: true, composed: true })
  filterChange!: EventEmitter<{ filters: Record<string, string> }>;
  @Event({ eventName: "searchChange", bubbles: true, composed: true })
  searchChange!: EventEmitter<{ query: string }>;
  @Event({ eventName: "pageChange", bubbles: true, composed: true })
  pageChange!: EventEmitter<{ pageIndex: number; pageSize: number }>;

  componentWillLoad() {
    this.internalFilters = this.filters.reduce<Record<string, string>>((acc, filter) => {
      if (filter.value) acc[filter.key] = filter.value;
      return acc;
    }, {});
    this.internalSelection = this.selectedKeys.reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
  }

  private getRowId(row: Record<string, unknown>, index: number) {
    if (typeof this.rowKey === "function") return this.rowKey(row);
    if (typeof this.rowKey === "string" && row[this.rowKey] != null) return String(row[this.rowKey]);
    return String(index);
  }

  private handleSearch = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    this.searchChange.emit({ query });
  };

  private handleFilterChange = (key: string, value: string) => {
    this.internalFilters = { ...this.internalFilters, [key]: value };
    this.filterChange.emit({ filters: this.internalFilters });
  };

  private handleSort(column: FeatureTableColumn) {
    if (!column.sortable) return;
    const next =
      this.internalSort && this.internalSort.key === column.key
        ? this.internalSort.direction === "asc"
          ? { key: column.key, direction: "desc" as const }
          : undefined
        : { key: column.key, direction: "asc" as const };
    this.internalSort = next;
    this.sortChange.emit({ sort: next });
  }

  private toggleRowSelection(rowId: string) {
    const next = { ...this.internalSelection };
    next[rowId] = !next[rowId];
    this.internalSelection = next;
    const keys = Object.keys(next).filter((key) => next[key]);
    this.selectionChanged.emit({ keys });
  }

  private toggleAllSelection(rows: Record<string, unknown>[]) {
    const allSelected = rows.every((row, index) => this.internalSelection[this.getRowId(row, index)]);
    const next: Record<string, boolean> = {};
    if (!allSelected) {
      rows.forEach((row, index) => {
        next[this.getRowId(row, index)] = true;
      });
    }
    this.internalSelection = next;
    const keys = Object.keys(next).filter((key) => next[key]);
    this.selectionChanged.emit({ keys });
  }

  private changePage(delta: number) {
    if (!this.pagination) return;
    const nextIndex = Math.max(0, this.pagination.pageIndex + delta);
    this.pageChange.emit({ pageIndex: nextIndex, pageSize: this.pagination.pageSize });
  }

  private get filteredRows() {
    let result = [...this.rows];
    if (this.searchable && this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter((row) =>
        this.columns.some((column) => String(row[column.key] ?? "").toLowerCase().includes(query)),
      );
    }
    if (this.filterable) {
      result = result.filter((row) =>
        Object.entries(this.internalFilters).every(([key, value]) => {
          if (!value) return true;
          return String(row[key] ?? "") === value;
        }),
      );
    }
    if (this.internalSort) {
      const { key, direction } = this.internalSort;
      result = [...result].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (av === bv) return 0;
        return direction === "asc" ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
      });
    }
    return result;
  }

  private get pagedRows() {
    if (!this.pagination) return this.filteredRows;
    const start = this.pagination.pageIndex * this.pagination.pageSize;
    const end = start + this.pagination.pageSize;
    return this.filteredRows.slice(start, end);
  }

  private renderToolbar(rows: Record<string, unknown>[]) {
    if (!this.searchable && !this.filterable && !this.selectable) return null;

    return (
      <div part="toolbar" class="toolbar">
        {this.selectable && (
          <label class="checkbox">
            <input
              type="checkbox"
              checked={rows.length > 0 && rows.every((row, index) => this.internalSelection[this.getRowId(row, index)])}
              onChange={() => this.toggleAllSelection(rows)}
            />
            <span>Select all</span>
          </label>
        )}

        {this.searchable && (
          <input
            part="search"
            class="search"
            type="search"
            placeholder="Search…"
            value={this.searchQuery}
            onInput={this.handleSearch}
          />
        )}

        {this.filterable && (
          <div class="filters">
            {this.filters.map((filter) => (
              <label class="filter" key={filter.key}>
                <span class="filter-label">{filter.label}</span>
                <select
                  class="filter-select"
                  onInput={(event) => this.handleFilterChange(filter.key, (event.target as HTMLSelectElement).value)}
                >
                  <option value="">Any</option>
                  {filter.options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      selected={(this.internalFilters[filter.key] ?? "") === option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  }

  private renderPagination(total: number) {
    if (!this.pagination) return null;
    const { pageIndex, pageSize } = this.pagination;
    const start = pageIndex * pageSize + 1;
    const end = Math.min(total, start + pageSize - 1);
    const totalText = total;

    return (
      <div part="pagination" class="pagination">
        <div class="pagination-meta">
          {start}-{end} of {totalText}
        </div>
        <div class="pagination-actions">
          <button part="page-prev" class="button" onClick={() => this.changePage(-1)} disabled={pageIndex === 0}>
            Prev
          </button>
          <button
            part="page-next"
            class="button"
            onClick={() => this.changePage(1)}
            disabled={end >= totalText}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  render() {
    const rows = this.pagedRows;
    const total = this.filteredRows.length;

    return (
      <div part="root" class="root" data-loading={this.loading ? "true" : "false"}>
        {this.caption && (
          <div part="caption" class="caption">
            {this.caption}
          </div>
        )}

        {this.renderToolbar(rows)}

        <div class="table-wrapper">
          <table part="table" class="table">
            <thead part="head" class="head">
              <tr>
                {this.selectable && <th class="selection-col" />}
                {this.columns.map((column) => {
                  const isSorted = this.internalSort?.key === column.key;
                  const direction = this.internalSort?.direction;
                  return (
                    <th
                      part="header"
                      key={column.key}
                      style={column.width ? { width: column.width } : undefined}
                      class={{
                        header: true,
                        sortable: !!column.sortable,
                        [`align-${column.align ?? "left"}`]: true,
                        sorted: isSorted,
                      }}
                      onClick={() => this.handleSort(column)}
                    >
                      <div class="header-content">
                        <slot name={`header-${column.key}`}>{column.header}</slot>
                        {column.sortable && (
                          <span class="sort-indicator" aria-hidden="true">
                            {isSorted ? (direction === "asc" ? "▲" : "▼") : "↕"}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
                <th class="actions-col">
                  <slot name="actions-header"></slot>
                </th>
              </tr>
            </thead>
            <tbody part="body" class="body">
              {this.loading ? (
                <tr>
                  <td class="empty" colSpan={this.columns.length + (this.selectable ? 1 : 0) + 1}>
                    <slot name="loading">Loading…</slot>
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td class="empty" colSpan={this.columns.length + (this.selectable ? 1 : 0) + 1}>
                    <slot name="empty">{this.emptyText}</slot>
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => {
                  const rowId = this.getRowId(row, index);
                  const selected = this.internalSelection[rowId];
                  return (
                    <tr
                      part="row"
                      key={rowId}
                      class={{
                        row: true,
                        selected,
                      }}
                      onClick={() => this.rowClick.emit({ row })}
                    >
                      {this.selectable && (
                        <td class="selection-col cell">
                          <label class="checkbox">
                            <input
                              type="checkbox"
                              checked={!!selected}
                              onClick={(event) => event.stopPropagation()}
                              onChange={() => this.toggleRowSelection(rowId)}
                              aria-label="Select row"
                            />
                          </label>
                        </td>
                      )}
                      {this.columns.map((column) => (
                        <td
                          part="cell"
                          key={column.key}
                          class={{
                            cell: true,
                            [`align-${column.align ?? "left"}`]: true,
                          }}
                        >
                          <slot name={`cell-${column.key}`}>
                            {(column.render ? column.render(row) : (row[column.key] ?? "—")) as Renderable}
                          </slot>
                        </td>
                      ))}
                      <td class="actions-col cell">
                        <slot name="row-actions" row-id={rowId}></slot>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {this.renderPagination(total)}
      </div>
    );
  }
}
