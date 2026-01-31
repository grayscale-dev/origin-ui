import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalSkeleton extends Component {
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
      lines: this.args.lines,
      media: this.args.media,
      title: this.args.title,
      description: this.args.description,
    });
  }
}
