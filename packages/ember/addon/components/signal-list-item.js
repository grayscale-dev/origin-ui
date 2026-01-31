import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalListItem extends Component {
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
      title: this.args.title,
      subtitle: this.args.subtitle,
      href: this.args.href,
      selected: this.args.selected,
      disabled: this.args.disabled,
    });
  }

  bindEvents() {
    if (!this.element) return;
    this.element.addEventListener("itemClick", (event) => this.args.onItemClick?.(event));
  }
}
