import { Component, Event, h, Prop } from "@stencil/core";
import type { EventEmitter } from "@stencil/core";

@Component({
  tag: "signal-list-item",
  styleUrl: "ui-list-item.css",
  shadow: true,
})
export class SignalListItem {
  @Prop({ attribute: "title" }) heading?: string;
  @Prop() subtitle?: string;
  @Prop() href?: string;
  @Prop({ reflect: true }) selected = false;
  @Prop({ reflect: true }) disabled = false;

  @Event({ eventName: "itemClick", bubbles: true, composed: true })
  itemClick!: EventEmitter<void>;

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.itemClick.emit();
  }

  render() {
    const Tag = (this.href ? "a" : "div") as keyof HTMLElementTagNameMap;

    return (
      <Tag
        part="root"
        href={this.href}
        class={{
          root: true,
          selected: this.selected,
          disabled: this.disabled,
        }}
        onClick={(event: Event) => this.handleClick(event)}
      >
        <div class="content">
          <div class="left">
            <slot name="left" />
          </div>
          <div class="text">
            <div class="title">
              <slot name="title">{this.heading}</slot>
            </div>
            {(this.subtitle || true) && (
              <div class="subtitle">
                <slot name="subtitle">{this.subtitle}</slot>
              </div>
            )}
          </div>
        </div>
        <div class="right">
          <slot name="right" />
        </div>
      </Tag>
    );
  }
}
