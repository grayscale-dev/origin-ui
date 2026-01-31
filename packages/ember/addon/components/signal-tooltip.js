import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalTooltip extends Component {
  element = null;

  @action
  setup(element) {
    this.element = element;
    this.syncProps();
  }

  @action
  syncProps() {
    assignProps(this.element, {
      content: this.args.content,
      variant: this.args.variant,
      placement: this.args.placement,
      delay: this.args.delay,
      interactive: this.args.interactive,
      disabled: this.args.disabled,
    });
  }
}
