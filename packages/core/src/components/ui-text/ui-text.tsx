import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "signal-text",
  styleUrl: "ui-text.css",
  shadow: true,
})
export class SignalText {
  @Prop() truncate = false;
  @Prop() clampLines?: number;

  render() {
    const clampStyle = this.clampLines
      ? {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: `${this.clampLines}`,
          overflow: "hidden",
        }
      : {};

    return (
      <p
        part="root"
        class={{
          root: true,
          truncate: this.truncate,
        }}
        style={clampStyle}
      >
        <slot />
      </p>
    );
  }
}
