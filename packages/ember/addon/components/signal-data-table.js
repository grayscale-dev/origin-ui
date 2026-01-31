import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalDataTable extends Component {
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
      emptyText: this.args.emptyText,
      getRowId: this.args.getRowId
    });
  }

  bindEvents() {
    if (!this.element) return;
    this.element.addEventListener("rowClick", (event) => this.args.onRowClick?.(event));
  }
}
