import { Component, Element, h, Prop, State } from "@stencil/core";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "subtle" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

@Component({
  tag: "signal-button",
  styleUrl: "ui-button.css",
  shadow: true,
})
export class SignalButton {
  @Element() host!: HTMLElement;

  @Prop({ reflect: true }) variant: ButtonVariant = "primary";
  @Prop({ reflect: true }) size: ButtonSize = "md";
  @Prop({ reflect: true }) loading = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) type: "button" | "submit" | "reset" = "button";

  @State() hasIconLeft = false;
  @State() hasIconRight = false;

  private get isDisabled() {
    return this.disabled || this.loading;
  }

  componentDidLoad() {
    this.syncIconState();
  }

  private syncIconState = () => {
    const leftSlot = this.host.shadowRoot?.querySelector("slot[name='icon-left']") as HTMLSlotElement | null;
    const rightSlot = this.host.shadowRoot?.querySelector("slot[name='icon-right']") as HTMLSlotElement | null;
    this.hasIconLeft = (leftSlot?.assignedElements().length ?? 0) > 0;
    this.hasIconRight = (rightSlot?.assignedElements().length ?? 0) > 0;
  };

  render() {
    return (
      <button
        part="button"
        class="button"
        type={this.type}
        disabled={this.isDisabled}
        aria-busy={this.loading ? "true" : "false"}
      >
        {this.loading && <span part="spinner" class="spinner" aria-hidden="true" />}
        <span part="icon-left" class="icon" hidden={!this.hasIconLeft}>
          <slot name="icon-left" onSlotchange={this.syncIconState} />
        </span>
        <span part="label" class="label">
          <slot />
        </span>
        <span part="icon-right" class="icon" hidden={!this.hasIconRight}>
          <slot name="icon-right" onSlotchange={this.syncIconState} />
        </span>
      </button>
    );
  }
}
