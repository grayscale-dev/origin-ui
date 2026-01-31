import { Component, h, Prop, State } from "@stencil/core";

type Placement = "top" | "right" | "bottom" | "left";

@Component({
  tag: "signal-tooltip",
  styleUrl: "ui-tooltip.css",
  shadow: true,
})
export class SignalTooltip {
  @Prop() content!: string;
  @Prop() variant: "tooltip" | "hovercard" = "tooltip";
  @Prop() placement: Placement = "top";
  @Prop() delay = 150;
  @Prop() interactive = false;
  @Prop() disabled = false;

  @State() open = false;

  private showTimeout?: number;
  private hideTimeout?: number;

  private openWithDelay() {
    if (this.disabled) return;
    window.clearTimeout(this.hideTimeout);
    this.showTimeout = window.setTimeout(() => (this.open = true), this.delay);
  }

  private closeWithDelay() {
    window.clearTimeout(this.showTimeout);
    this.hideTimeout = window.setTimeout(() => (this.open = false), this.delay);
  }

  render() {
    const popoverClass = {
      popover: true,
      [this.placement]: true,
      interactive: this.interactive,
      hovercard: this.variant === "hovercard",
      open: this.open,
    };

    return (
      <span
        part="trigger-wrapper"
        class="trigger-wrapper"
        onMouseEnter={() => this.openWithDelay()}
        onMouseLeave={() => this.closeWithDelay()}
        onFocus={() => this.openWithDelay()}
        onBlur={() => this.closeWithDelay()}
      >
        <slot />
        <span part="popover" class={popoverClass} role="tooltip" aria-hidden={!this.open}>
          <slot name="content">{this.content}</slot>
        </span>
      </span>
    );
  }
}
