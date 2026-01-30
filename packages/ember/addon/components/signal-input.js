import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalInput extends Component {
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
      value: this.args.value,
      placeholder: this.args.placeholder,
      name: this.args.name,
      type: this.args.type,
      disabled: this.args.disabled,
      readonly: this.args.readonly,
      required: this.args.required,
      inset: this.args.inset,
      autocomplete: this.args.autocomplete
    });
  }

  bindEvents() {
    if (!this.element) return;
    this.element.addEventListener("valueInput", (event) => this.args.onValueInput?.(event));
    this.element.addEventListener("valueChange", (event) => this.args.onValueChange?.(event));
  }
}
