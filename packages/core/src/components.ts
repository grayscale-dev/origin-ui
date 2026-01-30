export interface Components {
  SignalButton: Record<string, never>;
  SignalInput: Record<string, never>;
  SignalCombobox: Record<string, never>;
  SignalModal: Record<string, never>;
  SignalTable: Record<string, never>;
}

export interface JSX {
  IntrinsicElements: {
    "signal-button": Record<string, unknown>;
    "signal-input": Record<string, unknown>;
    "signal-combobox": Record<string, unknown>;
    "signal-modal": Record<string, unknown>;
    "signal-table": Record<string, unknown>;
  };
}

export interface SignalComboboxCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLElement;
}

export interface SignalInputCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLElement;
}

export interface SignalModalCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLElement;
}

export interface SignalTableCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLElement;
}
