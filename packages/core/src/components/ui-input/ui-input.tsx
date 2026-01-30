import { Component, Element, Event, h, Prop, State, Watch } from "@stencil/core";
import type { EventEmitter } from "@stencil/core";

@Component({
  tag: "signal-input",
  styleUrl: "ui-input.css",
  shadow: true,
})
export class SignalInput {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true }) value = "";
  @Prop() placeholder?: string;
  @Prop() name?: string;
  @Prop() type: string = "text";
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) readonly = false;
  @Prop({ reflect: true }) required = false;
  @Prop({ reflect: true }) inset = false;
  @Prop() autocomplete?: string;

  @State() hasPrefix = false;
  @State() hasSuffix = false;

  @Event({ eventName: "valueInput", bubbles: true, composed: true })
  valueInput!: EventEmitter<{ value: string }>;
  @Event({ eventName: "valueChange", bubbles: true, composed: true })
  valueChange!: EventEmitter<{ value: string }>;

  private inputEl?: HTMLInputElement;

  @Watch("value")
  onValueChange(next: string) {
    if (this.inputEl && this.inputEl.value !== next) {
      this.inputEl.value = next ?? "";
    }
  }

  componentDidLoad() {
    this.syncSlotState();
  }

  private syncSlotState = () => {
    const prefix = this.host.shadowRoot?.querySelector("slot[name='prefix']") as HTMLSlotElement | null;
    const suffix = this.host.shadowRoot?.querySelector("slot[name='suffix']") as HTMLSlotElement | null;
    this.hasPrefix = (prefix?.assignedElements().length ?? 0) > 0;
    this.hasSuffix = (suffix?.assignedElements().length ?? 0) > 0;
  };

  private handleInput = (event: Event) => {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.valueInput.emit({ value: next });
  };

  private handleChange = (event: Event) => {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.valueChange.emit({ value: next });
  };

  render() {
    return (
      <div
        part="field"
        class={{
          field: true,
          inset: this.inset,
          "has-prefix": this.hasPrefix,
          "has-suffix": this.hasSuffix,
        }}
      >
        <span part="prefix" class="prefix" aria-hidden={!this.hasPrefix ? "true" : "false"}>
          <slot name="prefix" onSlotchange={this.syncSlotState} />
        </span>
        <input
          part="input"
          class="input"
          ref={(el) => (this.inputEl = el as HTMLInputElement)}
          value={this.value}
          name={this.name}
          type={this.type}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          required={this.required}
          autocomplete={this.autocomplete}
          onInput={this.handleInput}
          onChange={this.handleChange}
        />
        <span part="suffix" class="suffix" aria-hidden={!this.hasSuffix ? "true" : "false"}>
          <slot name="suffix" onSlotchange={this.syncSlotState} />
        </span>
      </div>
    );
  }
}
