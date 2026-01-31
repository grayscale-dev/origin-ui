import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalHeading extends Component {
  element = null;

  @action
  setup(element) {
    this.element = element;
    this.syncProps();
  }

  @action
  syncProps() {
    assignProps(this.element, {
      level: this.args.level,
      align: this.args.align,
    });
  }
}
