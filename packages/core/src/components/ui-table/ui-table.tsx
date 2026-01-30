import { Component, Event, h, Prop, State, Watch } from "@stencil/core";
import type { EventEmitter } from "@stencil/core";

export type TableColumn = {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  render?: (row: Record<string, unknown>) => string;
};

export type TableFilterOption = {
  value: string;
  label: string;
};

export type TableFilter = {
  key: string;
  label: string;
  options: TableFilterOption[];
  value?: string;
};

@Component({
  tag: "signal-table",
  styleUrl: "ui-table.css",
  shadow: true,
})
export class SignalTable {
  @Prop() columns: TableColumn[] = [];
  @Prop() rows: Record<string, unknown>[] = [];
  @Prop() caption?: string;
  @Prop() rowKey?: string;
  @Prop({ reflect: true }) searchable = false;
  @Prop({ reflect: true }) filterable = false;
  @Prop({ reflect: true }) reorderable = false;
  @Prop({ reflect: true }) loading = false;
  @Prop() emptyText = "No results";
  @Prop() filters: TableFilter[] = [];

  @State() searchQuery = "";
  @State() activeFilters: Record<string, string> = {};
  @State() internalRows: Record<string, unknown>[] = [];

  @Event({ eventName: "rowClick", bubbles: true, composed: true })
  rowClick!: EventEmitter<{ row: Record<string, unknown> }>;
  @Event({ eventName: "reorder", bubbles: true, composed: true })
  reorder!: EventEmitter<{ rows: Record<string, unknown>[] }>;
  @Event({ eventName: "searchChange", bubbles: true, composed: true })
  searchChange!: EventEmitter<{ query: string }>;
  @Event({ eventName: "filterChange", bubbles: true, composed: true })
  filterChange!: EventEmitter<{ filters: Record<string, string> }>;

  componentWillLoad() {
    this.internalRows = [...this.rows];
    this.activeFilters = this.filters.reduce<Record<string, string>>((acc, filter) => {
      if (filter.value) acc[filter.key] = filter.value;
      return acc;
    }, {});
  }

  @Watch("rows")
  onRowsChange(next: Record<string, unknown>[]) {
    this.internalRows = [...next];
  }

  @Watch("filters")
  onFiltersPropChange(next: TableFilter[]) {
    this.activeFilters = next.reduce<Record<string, string>>((acc, filter) => {
      if (filter.value) acc[filter.key] = filter.value;
      return acc;
    }, {});
  }

  private getFilteredRows() {
    let result = [...this.internalRows];
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter((row) =>
        this.columns.some((column) => String(row[column.key] ?? "").toLowerCase().includes(query)),
      );
    }
    if (this.filterable && Object.keys(this.activeFilters).length > 0) {
      result = result.filter((row) =>
        Object.entries(this.activeFilters).every(([key, value]) => {
          if (!value) return true;
          return String(row[key] ?? "") === value;
        }),
      );
    }
    return result;
  }

  private handleSearch = (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    this.searchChange.emit({ query });
  };

  private handleFilterChange = (key: string, value: string) => {
    this.activeFilters = { ...this.activeFilters, [key]: value };
    this.filterChange.emit({ filters: this.activeFilters });
  };

  private handleReorder = (fromIndex: number, toIndex: number) => {
    if (!this.reorderable) return;
    const next = [...this.internalRows];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    this.internalRows = next;
    this.reorder.emit({ rows: next });
  };

  private getRowId(row: Record<string, unknown>, index: number) {
    if (this.rowKey && row[this.rowKey] != null) {
      return String(row[this.rowKey]);
    }
    return String(index);
  }

  render() {
    const rows = this.getFilteredRows();
    const hasToolbar = this.searchable || this.filterable;

    return (
      <div part="container" class="container">
        {hasToolbar && (
          <div part="toolbar" class="toolbar">
            {this.searchable && (
              <input
                part="search"
                class="search"
                type="search"
                placeholder="Search..."
                value={this.searchQuery}
                onInput={this.handleSearch}
              />
            )}
            {this.filterable && this.filters.length > 0 && (
              <div part="filters" class="filters">
                {this.filters.map((filter) => {
                  const currentValue = this.activeFilters[filter.key] || "";
                  return (
                    <label class="filter" part="filter" key={filter.key}>
                      <span class="filter-label">{filter.label}</span>
                      <select
                        class="filter-select"
                        part="filter-select"
                        onChange={(event) => this.handleFilterChange(filter.key, (event.target as HTMLSelectElement).value)}
                      >
                        <option value="" selected={currentValue === ""}>
                          All
                        </option>
                        {filter.options.map((option) => (
                          <option value={option.value} selected={currentValue === option.value} key={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                })}
              </div>
            )}
            <slot name="filters" />
          </div>
        )}
        <div part="table-wrapper" class="table-wrapper">
          <table part="table" class="table">
            {this.caption && <caption part="caption" class="caption">{this.caption}</caption>}
            <thead>
              <tr part="head-row" class="head-row">
                {this.columns.map((column) => (
                  <th
                    part="head-cell"
                    class={{ "head-cell": true, [`align-${column.align ?? "left"}`]: true }}
                    scope="col"
                    key={column.key}
                  >
                    {column.header}
                  </th>
                ))}
                {this.reorderable && <th part="head-cell" class="head-cell">Order</th>}
              </tr>
            </thead>
            <tbody>
              {this.loading ? (
                <tr part="row">
                  <td part="cell" class="cell" colSpan={this.columns.length + (this.reorderable ? 1 : 0)}>
                    Loading...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr part="row">
                  <td part="cell" class="cell" colSpan={this.columns.length + (this.reorderable ? 1 : 0)}>
                    <slot name="empty">{this.emptyText}</slot>
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr
                    part="row"
                    class="row"
                    onClick={() => this.rowClick.emit({ row })}
                    key={this.getRowId(row, index)}
                  >
                    {this.columns.map((column) => (
                      <td
                        part="cell"
                        class={{ cell: true, [`align-${column.align ?? "left"}`]: true }}
                        key={`${this.getRowId(row, index)}-${column.key}`}
                      >
                        {column.render ? column.render(row) : String(row[column.key] ?? "—")}
                      </td>
                    ))}
                    {this.reorderable && (
                      <td part="cell" class="cell">
                        <div class="reorder-controls">
                          <button
                            part="reorder-up"
                            class="reorder-button"
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              this.handleReorder(index, Math.max(0, index - 1));
                            }}
                          >
                            Up
                          </button>
                          <button
                            part="reorder-down"
                            class="reorder-button"
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              this.handleReorder(index, Math.min(rows.length - 1, index + 1));
                            }}
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
        </div>
      </div>
    );
  }
}
