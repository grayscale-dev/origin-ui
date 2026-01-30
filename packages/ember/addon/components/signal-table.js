import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalTable extends Component {
  element = null;

  @action
  setup(element) {
    this.element = element;
    this.syncProps();
    this.bindEvents();
  }

  @action
  syncProps() {
    assignProps(this.element, {
      columns: this.args.columns,
      rows: this.args.rows,
      caption: this.args.caption,
      rowKey: this.args.rowKey,
      searchable: this.args.searchable,
      filterable: this.args.filterable,
      filters: this.args.filters,
      reorderable: this.args.reorderable,
      loading: this.args.loading,
      emptyText: this.args.emptyText
    });
  }

  bindEvents() {
    if (!this.element) return;
    this.element.addEventListener("rowClick", (event) => this.args.onRowClick?.(event));
    this.element.addEventListener("reorder", (event) => this.args.onReorder?.(event));
    this.element.addEventListener("searchChange", (event) => this.args.onSearchChange?.(event));
    this.element.addEventListener("filterChange", (event) => this.args.onFilterChange?.(event));
  }
}
