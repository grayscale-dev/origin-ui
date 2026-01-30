import { Component, Element, Event, h, Listen, Prop, State, Watch } from "@stencil/core";
import type { EventEmitter } from "@stencil/core";

export type ModalSize = "sm" | "md" | "lg";

@Component({
  tag: "signal-modal",
  styleUrl: "ui-modal.css",
  shadow: true,
})
export class SignalModal {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() heading?: string;
  @Prop() description?: string;
  @Prop({ reflect: true }) size: ModalSize = "md";
  @Prop({ reflect: true }) closeOnBackdrop = true;
  @Prop({ reflect: true }) closeOnEsc = true;
  @Prop({ reflect: true }) dragEnabled = false;
  @Prop({ reflect: true }) resizable = false;
  @Prop({ reflect: true }) fullscreen = false;
  @Prop({ reflect: true }) showHeaderControls = true;
  @Prop({ reflect: true }) showConfirm = false;
  @Prop() confirmText = "Confirm";
  @Prop() defaultSize?: { width: number; height: number };
  @Prop() minSize?: { width: number; height: number };
  @Prop() maxSize?: { width: number; height: number };
  @Prop() defaultPosition?: { x: number; y: number };

  @State() position = { x: 0, y: 0 };
  @State() sizeState = { width: 680, height: 480 };

  @Event({ eventName: "openChange", bubbles: true, composed: true })
  openChange!: EventEmitter<{ open: boolean }>;
  @Event({ eventName: "close", bubbles: true, composed: true })
  close!: EventEmitter<void>;
  @Event({ eventName: "confirm", bubbles: true, composed: true })
  confirm!: EventEmitter<void>;

  private dialogEl?: HTMLDivElement;
  private lastActiveElement: HTMLElement | null = null;
  private previousOverflow = "";
  private dragging = false;
  private resizing = false;
  private dragStart = { x: 0, y: 0, signalX: 0, signalY: 0 };
  private resizeStart = { x: 0, y: 0, width: 0, height: 0 };

  @Watch("open")
  onOpenChange(next: boolean) {
    this.openChange.emit({ open: next });
    if (next) {
      this.lastActiveElement = document.activeElement as HTMLElement | null;
      this.previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      this.resetPosition();
      requestAnimationFrame(() => this.focusFirstElement());
    } else {
      document.body.style.overflow = this.previousOverflow;
      this.lastActiveElement?.focus();
    }
  }

  componentWillLoad() {
    if (this.defaultSize) {
      this.sizeState = { ...this.defaultSize };
    }
    if (this.defaultPosition) {
      this.position = { ...this.defaultPosition };
    }
  }

  componentDidLoad() {
    if (this.open) {
      this.onOpenChange(true);
    }
  }

  @Listen("keydown", { target: "document" })
  handleGlobalKeydown(event: KeyboardEvent) {
    if (!this.open) return;
    if (event.key === "Escape" && this.closeOnEsc) {
      event.preventDefault();
      this.requestClose();
    }
    if (event.key === "Tab") {
      this.handleTrapFocus(event);
    }
  }

  private focusFirstElement() {
    const focusables = this.getFocusableElements();
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      this.dialogEl?.focus();
    }
  }

  private getFocusableElements() {
    if (!this.dialogEl) return [];
    const selectors = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    return Array.from(this.dialogEl.querySelectorAll<HTMLElement>(selectors)).filter((el) => !el.hasAttribute("disabled"));
  }

  private handleTrapFocus = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const focusables = this.getFocusableElements();
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  private requestClose() {
    this.close.emit();
    this.open = false;
  }

  private resetPosition() {
    if (this.defaultPosition) {
      this.position = { ...this.defaultPosition };
      return;
    }
    this.position = { x: 0, y: 0 };
  }

  private handleDragStart = (event: PointerEvent) => {
    if (!this.dragEnabled || this.fullscreen) return;
    if ((event.target as HTMLElement).closest("button")) return;
    this.dragging = true;
    this.dragStart = {
      x: event.clientX,
      y: event.clientY,
      signalX: this.position.x,
      signalY: this.position.y,
    };
    window.addEventListener("pointermove", this.handleDragMove);
    window.addEventListener("pointerup", this.handleDragEnd);
  };

  private handleDragMove = (event: PointerEvent) => {
    if (!this.dragging) return;
    this.position = {
      x: this.dragStart.signalX + (event.clientX - this.dragStart.x),
      y: this.dragStart.signalY + (event.clientY - this.dragStart.y),
    };
  };

  private handleDragEnd = () => {
    this.dragging = false;
    window.removeEventListener("pointermove", this.handleDragMove);
    window.removeEventListener("pointerup", this.handleDragEnd);
  };

  private handleResizeStart = (event: PointerEvent) => {
    if (!this.resizable || this.fullscreen) return;
    event.stopPropagation();
    this.resizing = true;
    this.resizeStart = {
      x: event.clientX,
      y: event.clientY,
      width: this.sizeState.width,
      height: this.sizeState.height,
    };
    window.addEventListener("pointermove", this.handleResizeMove);
    window.addEventListener("pointerup", this.handleResizeEnd);
  };

  private handleResizeMove = (event: PointerEvent) => {
    if (!this.resizing) return;
    const nextWidth = this.resizeStart.width + (event.clientX - this.resizeStart.x);
    const nextHeight = this.resizeStart.height + (event.clientY - this.resizeStart.y);
    const minWidth = this.minSize?.width ?? 360;
    const minHeight = this.minSize?.height ?? 240;
    const maxWidth = this.maxSize?.width ?? 1200;
    const maxHeight = this.maxSize?.height ?? 900;
    this.sizeState = {
      width: Math.max(minWidth, Math.min(maxWidth, nextWidth)),
      height: Math.max(minHeight, Math.min(maxHeight, nextHeight)),
    };
  };

  private handleResizeEnd = () => {
    this.resizing = false;
    window.removeEventListener("pointermove", this.handleResizeMove);
    window.removeEventListener("pointerup", this.handleResizeEnd);
  };

  private handleHeaderKeyDown = (event: KeyboardEvent) => {
    if (!this.dragEnabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  };

  render() {
    if (!this.open) return null;

    const dialogStyle: Record<string, string> = this.fullscreen
      ? {}
      : {
          transform: `translate(${this.position.x}px, ${this.position.y}px)`,
        };
    if (!this.fullscreen && (this.resizable || this.defaultSize)) {
      dialogStyle.width = `${this.sizeState.width}px`;
      dialogStyle.height = `${this.sizeState.height}px`;
    }

    const headerRole = this.dragEnabled ? "button" : undefined;
    const headerTabIndex = this.dragEnabled ? 0 : undefined;
    const headerPointerDown = this.dragEnabled ? this.handleDragStart : undefined;
    const headerKeyDown = this.dragEnabled ? this.handleHeaderKeyDown : undefined;

    return (
      <div part="overlay" class="overlay">
        <div
          part="backdrop"
          class="backdrop"
          onClick={this.closeOnBackdrop ? () => this.requestClose() : undefined}
          aria-hidden="true"
        />
        <div
          part="dialog"
          class={{ dialog: true, fullscreen: this.fullscreen }}
          role="dialog"
          aria-modal="true"
          aria-label={this.heading}
          style={dialogStyle}
          ref={(el) => (this.dialogEl = el as HTMLDivElement)}
          tabindex={-1}
        >
          <div
            part="header"
            class="header"
            role={headerRole}
            tabIndex={headerTabIndex}
            onPointerDown={headerPointerDown}
            onKeyDown={headerKeyDown}
          >
            <slot name="header">
              <div class="header-content">
                <div>
                  {this.heading && <h2 class="title">{this.heading}</h2>}
                  {this.description && <p class="description">{this.description}</p>}
                </div>
                {this.showHeaderControls && (
                  <div class="header-actions">
                    {this.showConfirm && (
                      <button class="header-button" type="button" onClick={() => this.confirm.emit()}>
                        {this.confirmText}
                      </button>
                    )}
                    <button
                      class="close-button"
                      type="button"
                      aria-label="Close dialog"
                      onClick={() => this.requestClose()}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </slot>
          </div>
          <div part="body" class="body">
            <slot />
          </div>
          <div part="footer" class="footer">
            <slot name="footer" />
          </div>
          {this.resizable && !this.fullscreen && (
            <div part="resize-handle" class="resize-handle" onPointerDown={this.handleResizeStart} />
          )}
        </div>
      </div>
    );
  }
}
