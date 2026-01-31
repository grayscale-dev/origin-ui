export interface Components {
  SignalButton: Record<string, never>;
  SignalInput: Record<string, never>;
  SignalCombobox: Record<string, never>;
  SignalDataTable: Record<string, never>;
  SignalFeatureTable: Record<string, never>;
  SignalFileUpload: Record<string, never>;
  SignalModal: Record<string, never>;
  SignalTable: Record<string, never>;
}

export interface JSX {
  IntrinsicElements: {
    "signal-button": Record<string, unknown>;
    "signal-input": Record<string, unknown>;
    "signal-combobox": Record<string, unknown>;
    "signal-data-table": Record<string, unknown>;
    "signal-feature-table": Record<string, unknown>;
    "signal-file-upload": Record<string, unknown>;
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

export interface SignalDataTableCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLElement;
}

export interface SignalFeatureTableCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLElement;
}

export interface SignalFileUploadCustomEvent<T> extends CustomEvent<T> {
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
