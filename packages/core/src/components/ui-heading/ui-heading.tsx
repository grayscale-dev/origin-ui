import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "signal-heading",
  styleUrl: "ui-heading.css",
  shadow: true,
})
export class SignalHeading {
  @Prop() level: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  @Prop() align: "left" | "center" | "right" = "left";

  render() {
    const Tag = (`h${this.level}` as unknown) as keyof HTMLElementTagNameMap;

    return (
      <Tag
        part="root"
        class={{
          root: true,
          [`align-${this.align}`]: true,
        }}
      >
        <slot />
      </Tag>
    );
  }
}
