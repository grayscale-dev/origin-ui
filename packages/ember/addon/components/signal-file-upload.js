import Component from "@glimmer/component";
import { action } from "@ember/object";
import { assignProps } from "../utils/element-props";

export default class SignalFileUpload extends Component {
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
      accept: this.args.accept,
      multiple: this.args.multiple,
      maxSize: this.args.maxSize,
      maxFiles: this.args.maxFiles,
      value: this.args.value,
      previews: this.args.previews,
      progress: this.args.progress,
      disabled: this.args.disabled
    });
  }

  bindEvents() {
    if (!this.element) return;
    this.element.addEventListener("select", (event) => this.args.onSelect?.(event));
    this.element.addEventListener("upload", (event) => this.args.onUpload?.(event));
    this.element.addEventListener("remove", (event) => this.args.onRemove?.(event));
  }
}
