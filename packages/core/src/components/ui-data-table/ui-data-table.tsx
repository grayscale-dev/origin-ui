import { Component, Event, h, Prop } from "@stencil/core";
import type { EventEmitter, VNode } from "@stencil/core";

type Renderable = string | number | boolean | null | undefined | Element | Node | VNode;

export type DataTableColumn = {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  render?: (row: Record<string, unknown>) => Renderable;
};

@Component({
  tag: "signal-data-table",
  styleUrl: "ui-data-table.css",
  shadow: true,
})
export class SignalDataTable {
  @Prop() columns: DataTableColumn[] = [];
  @Prop() rows: Record<string, unknown>[] = [];
  @Prop() caption?: string;
  @Prop() emptyText = "No results";
  @Prop() getRowId?: (row: Record<string, unknown>, index: number) => string | number;

  @Event({ eventName: "rowClick", bubbles: true, composed: true })
  rowClick!: EventEmitter<{ row: Record<string, unknown> }>;

  private getRowKey(row: Record<string, unknown>, index: number) {
    if (this.getRowId) return String(this.getRowId(row, index));
    return String(index);
  }

  private handleRowClick(row: Record<string, unknown>) {
    this.rowClick.emit({ row });
  }

  render() {
    const { columns, rows } = this;

    return (
      <div part="root" class="root">
        <div class="table-wrapper">
          <table part="table" class="table">
            {this.caption && (
              <caption part="caption" class="caption">
                {this.caption}
              </caption>
            )}
            <thead part="head" class="head">
              <tr>
                {columns.map((column) => (
                  <th
                    part="header"
                    key={column.key}
                    class={{
                      header: true,
                      [`align-${column.align ?? "left"}`]: true,
                    }}
                    scope="col"
                  >
                    <slot name={`header-${column.key}`}>{column.header}</slot>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody part="body" class="body">
              {rows.length === 0 ? (
                <tr>
                  <td part="empty" class="empty" colSpan={columns.length}>
                    <slot name="empty">{this.emptyText}</slot>
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr
                    key={this.getRowKey(row, index)}
                    class="row"
                    part="row"
                    onClick={() => this.handleRowClick(row)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        part="cell"
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
