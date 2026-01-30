import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalButton extends Component {
  element = null;

  @action
  setup(element) {
    this.element = element;
    this.syncProps();
  }

  @action
  syncProps() {
    assignProps(this.element, {
      variant: this.args.variant,
      size: this.args.size,
      loading: this.args.loading,
      disabled: this.args.disabled,
      type: this.args.type
    });
  }
}
