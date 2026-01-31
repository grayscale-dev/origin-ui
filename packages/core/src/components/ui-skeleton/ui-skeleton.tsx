import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "signal-skeleton",
  styleUrl: "ui-skeleton.css",
  shadow: true,
})
export class SignalSkeleton {
  @Prop() variant: "skeleton" | "empty" | "error" = "skeleton";
  @Prop() lines = 3;
  @Prop() media = false;
  @Prop({ attribute: "title" }) heading?: string;
  @Prop() description?: string;

  render() {
    if (this.variant === "empty" || this.variant === "error") {
      return (
        <div
          part="root"
          class={{
            root: true,
            panel: true,
            error: this.variant === "error",
          }}
        >
          {this.heading && (
            <div part="title" class="panel-title">
              <slot name="title">{this.heading}</slot>
            </div>
          )}
          {this.description && (
            <div part="description" class="panel-description">
              <slot name="description">{this.description}</slot>
            </div>
          )}
          <slot name="actions">
            {this.variant === "error" ? <button class="retry" part="retry">Retry</button> : null}
          </slot>
        </div>
      );
    }

    return (
      <div part="root" class="root skeleton">
        {this.media && <div part="media" class="media" />}
        {Array.from({ length: this.lines }).map((_, index) => (
          <div
            key={index}
            part="line"
            class={{
              line: true,
              "line-first": index === 0,
            }}
          />
        ))}
      </div>
    );
  }
}
