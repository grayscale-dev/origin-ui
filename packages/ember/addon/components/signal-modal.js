import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalModal extends Component {
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
      open: this.args.open,
      heading: this.args.heading,
      description: this.args.description,
      size: this.args.size,
      closeOnBackdrop: this.args.closeOnBackdrop,
      closeOnEsc: this.args.closeOnEsc,
      dragEnabled: this.args.dragEnabled,
      resizable: this.args.resizable,
      fullscreen: this.args.fullscreen,
      showHeaderControls: this.args.showHeaderControls,
      showConfirm: this.args.showConfirm,
      confirmText: this.args.confirmText,
      defaultSize: this.args.defaultSize,
      minSize: this.args.minSize,
      maxSize: this.args.maxSize,
      defaultPosition: this.args.defaultPosition
    });
  }

  bindEvents() {
    if (!this.element) return;
    this.element.addEventListener("openChange", (event) => this.args.onOpenChange?.(event));
    this.element.addEventListener("close", (event) => this.args.onClose?.(event));
    this.element.addEventListener("confirm", (event) => this.args.onConfirm?.(event));
  }
}
