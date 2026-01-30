import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalCombobox extends Component {
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
      options: this.args.options,
      value: this.args.value,
      defaultValue: this.args.defaultValue,
      mode: this.args.mode,
      placeholder: this.args.placeholder,
      disabled: this.args.disabled,
      loading: this.args.loading,
      clearable: this.args.clearable,
      searchable: this.args.searchable,
      creatable: this.args.creatable,
      maxSelected: this.args.maxSelected,
      closeOnSelect: this.args.closeOnSelect
    });
  }

  bindEvents() {
    if (!this.element) return;
    this.element.addEventListener("valueChange", (event) => this.args.onValueChange?.(event));
    this.element.addEventListener("openChange", (event) => this.args.onOpenChange?.(event));
    this.element.addEventListener("queryChange", (event) => this.args.onQueryChange?.(event));
    this.element.addEventListener("clear", (event) => this.args.onClear?.(event));
  }
}
