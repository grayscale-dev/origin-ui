import { Component, Element, Event, h, Listen, Prop, State, Watch } from "@stencil/core";
import type { EventEmitter } from "@stencil/core";

export type ComboboxMode = "single" | "multi";

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
};

@Component({
  tag: "signal-combobox",
  styleUrl: "ui-combobox.css",
  shadow: true,
})
export class SignalCombobox {
  @Element() host!: HTMLElement;

  @Prop() options: ComboboxOption[] = [];
  @Prop({ mutable: true }) value?: string | string[] | null;
  @Prop() defaultValue?: string | string[] | null;
  @Prop({ reflect: true }) mode: ComboboxMode = "single";
  @Prop() placeholder = "Select";
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) loading = false;
  @Prop({ reflect: true }) clearable = false;
  @Prop({ reflect: true }) searchable = true;
  @Prop({ reflect: true }) creatable = false;
  @Prop() maxSelected?: number;
  @Prop({ reflect: true }) closeOnSelect?: boolean;

  @State() open = false;
  @State() query = "";
  @State() highlightedIndex = 0;
  @State() internalValue: string | string[] | null = null;

  @Event({ eventName: "valueChange", bubbles: true, composed: true })
  valueChange!: EventEmitter<{ value: string | string[] | null }>;
  @Event({ eventName: "openChange", bubbles: true, composed: true })
  openChange!: EventEmitter<{ open: boolean }>;
  @Event({ eventName: "queryChange", bubbles: true, composed: true })
  queryChange!: EventEmitter<{ query: string }>;
  @Event({ eventName: "clear", bubbles: true, composed: true })
  clear!: EventEmitter<void>;

  private inputEl?: HTMLInputElement;
  private triggerEl?: HTMLButtonElement;
  private listId = `signal-combobox-${Math.random().toString(36).slice(2)}`;

  @Watch("open")
  onOpenChange(next: boolean) {
    this.openChange.emit({ open: next });
    if (next) {
      requestAnimationFrame(() => {
        this.inputEl?.focus();
      });
    }
  }

  componentWillLoad() {
    if (this.defaultValue !== undefined) {
      this.internalValue = this.defaultValue;
    } else {
      this.internalValue = this.mode === "multi" ? [] : "";
    }
  }

  @Listen("mousedown", { target: "document" })
  handleOutsideClick(event: MouseEvent) {
    if (!this.open) return;
    const path = event.composedPath();
    if (!path.includes(this.host)) {
      this.closeListbox();
    }
  }

  private get isMulti() {
    return this.mode === "multi";
  }

  private get selectedValue() {
    return this.value !== undefined ? this.value : this.internalValue;
  }

  private setSelectedValue(next: string | string[] | null) {
    if (this.value === undefined) {
      this.internalValue = next;
    }
    this.valueChange.emit({ value: next });
  }

  private get filteredOptions() {
    if (!this.query) return this.options;
    const query = this.query.toLowerCase();
    return this.options.filter((option) => option.label.toLowerCase().includes(query));
  }

  private get selectedLabels() {
    if (this.isMulti) {
      const values = Array.isArray(this.selectedValue) ? this.selectedValue : [];
      return this.options.filter((option) => values.includes(option.value)).map((option) => option.label);
    }
    const selected = this.options.find((option) => option.value === this.selectedValue);
    return selected ? [selected.label] : [];
  }

  private toggleOpen = () => {
    if (this.disabled) return;
    this.open = !this.open;
    if (!this.open) {
      this.query = "";
      this.highlightedIndex = 0;
    }
  };

  private openListbox = () => {
    if (this.disabled) return;
    this.open = true;
  };

  private closeListbox = () => {
    this.open = false;
    this.query = "";
    this.highlightedIndex = 0;
    this.triggerEl?.focus();
  };

  private handleSelect = (option: ComboboxOption) => {
    if (option.disabled) return;
    if (this.isMulti) {
      const current = Array.isArray(this.selectedValue) ? [...this.selectedValue] : [];
      const exists = current.includes(option.value);
      const next = exists ? current.filter((value) => value !== option.value) : [...current, option.value];
      if (this.maxSelected && next.length > this.maxSelected) return;
      this.setSelectedValue(next);
      if (this.closeOnSelect ?? !this.isMulti) {
        this.closeListbox();
      }
    } else {
      this.setSelectedValue(option.value);
      this.closeListbox();
    }
  };

  private handleClear = () => {
    const next = this.isMulti ? [] : "";
    this.setSelectedValue(next);
    this.query = "";
    this.clear.emit();
  };

  private handleInput = (event: Event) => {
    const next = (event.target as HTMLInputElement).value;
    this.query = next;
    this.highlightedIndex = 0;
    this.queryChange.emit({ query: next });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const options = this.filteredOptions;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!this.open) {
        this.openListbox();
      } else {
        this.highlightedIndex = Math.min(options.length - 1, this.highlightedIndex + 1);
      }
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!this.open) {
        this.openListbox();
      } else {
        this.highlightedIndex = Math.max(0, this.highlightedIndex - 1);
      }
    }
    if (event.key === "Enter") {
      if (!this.open) {
        this.openListbox();
        return;
      }
      event.preventDefault();
      const option = options[this.highlightedIndex];
      if (option) {
        this.handleSelect(option);
      } else if (this.creatable && this.query) {
        const current = Array.isArray(this.selectedValue) ? this.selectedValue : [];
        this.setSelectedValue(this.isMulti ? [...current, this.query] : this.query);
        this.closeListbox();
      }
    }
    if (event.key === "Escape") {
      if (this.open) {
        event.preventDefault();
        this.closeListbox();
      }
    }
  };

  private handleOptionKeyDown = (event: KeyboardEvent, option: ComboboxOption) => {
    if (option.disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.handleSelect(option);
    }
  };

  private handleCreateOption = () => {
    if (!this.creatable || !this.query) return;
    const next = this.isMulti ? [...(Array.isArray(this.selectedValue) ? this.selectedValue : []), this.query] : this.query;
    this.setSelectedValue(next);
    this.closeListbox();
  };

  render() {
    const selectedLabels = this.selectedLabels;
    const displayValue = selectedLabels.length ? selectedLabels.join(", ") : "";
    const options = this.filteredOptions;
    const activeOption = options[this.highlightedIndex];
    const showClear = this.clearable && (this.isMulti ? selectedLabels.length > 0 : Boolean(displayValue));

    return (
      <div part="container" class={{ container: true, open: this.open, disabled: this.disabled }}>
        <div part="control" class="control">
          <button
            part="trigger"
            class="trigger"
            type="button"
            ref={(el) => (this.triggerEl = el as HTMLButtonElement)}
            aria-haspopup="listbox"
            aria-expanded={this.open ? "true" : "false"}
            aria-controls={this.listId}
            disabled={this.disabled}
            onClick={this.toggleOpen}
            onKeyDown={this.handleKeyDown}
          >
            <span part="value" class={{ value: true, placeholder: !displayValue }}>
              {displayValue || this.placeholder}
            </span>
            <span part="caret" class="caret" aria-hidden="true">
              ▾
            </span>
          </button>
          {this.open && (
            <input
              part="input"
              class="input"
              ref={(el) => (this.inputEl = el as HTMLInputElement)}
              placeholder={this.placeholder}
              value={this.query}
              readonly={!this.searchable}
              onInput={this.searchable ? this.handleInput : undefined}
              onKeyDown={this.handleKeyDown}
              aria-autocomplete="list"
              aria-controls={this.listId}
              aria-activedescendant={activeOption ? `${this.listId}-option-${this.highlightedIndex}` : undefined}
            />
          )}
          {showClear && (
            <button part="clear" class="clear" type="button" onClick={this.handleClear} aria-label="Clear selection">
              Clear
            </button>
          )}
        </div>
        {this.open && (
          <div
            part="listbox"
            id={this.listId}
            class="listbox"
            role="listbox"
            aria-multiselectable={this.isMulti ? "true" : "false"}
          >
            {this.loading && <div part="empty" class="empty">Loading...</div>}
            {!this.loading && options.length === 0 && <div part="empty" class="empty">No options</div>}
            {!this.loading &&
              options.map((option, index) => {
                const selected = this.isMulti
                  ? Array.isArray(this.selectedValue) && this.selectedValue.includes(option.value)
                  : this.selectedValue === option.value;
                const active = option.value === activeOption?.value;
                return (
                  <div
                    part={selected ? "option option-selected" : "option"}
                    class={{ option: true, selected, active, disabled: Boolean(option.disabled) }}
                    role="option"
                    id={`${this.listId}-option-${index}`}
                    aria-selected={selected ? "true" : "false"}
                    aria-disabled={option.disabled ? "true" : "false"}
                    key={option.value}
                    tabIndex={option.disabled ? -1 : 0}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => this.handleSelect(option)}
                    onKeyDown={(event) => this.handleOptionKeyDown(event, option)}
                  >
                    <span class="option-label">{option.label}</span>
                    {selected && <span class="check">✓</span>}
                  </div>
                );
              })}
            {this.creatable && this.query && !options.some((option) => option.label === this.query) && (
              <div
                part="option option-create"
                class="option create"
                role="option"
                tabIndex={0}
                aria-selected="false"
                onClick={this.handleCreateOption}
                onKeyDown={(event) => this.handleOptionKeyDown(event, { value: this.query, label: this.query })}
              >
                {`Create \"${this.query}\"`}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
