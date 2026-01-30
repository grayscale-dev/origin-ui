/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@signal-ui/core/dist/custom-elements';

import { defineCustomElement as defineSignalButton } from '@signal-ui/core/dist/custom-elements/signal-button.js';
import { defineCustomElement as defineSignalCombobox } from '@signal-ui/core/dist/custom-elements/signal-combobox.js';
import { defineCustomElement as defineSignalInput } from '@signal-ui/core/dist/custom-elements/signal-input.js';
import { defineCustomElement as defineSignalModal } from '@signal-ui/core/dist/custom-elements/signal-modal.js';
import { defineCustomElement as defineSignalTable } from '@signal-ui/core/dist/custom-elements/signal-table.js';
@ProxyCmp({
  defineCustomElementFn: defineSignalButton,
  inputs: ['disabled', 'loading', 'size', 'type', 'variant']
})
@Component({
  selector: 'signal-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'loading', 'size', 'type', 'variant'],
})
export class SignalButton {
  protected el: HTMLSignalButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SignalButton extends Components.SignalButton {}


@ProxyCmp({
  defineCustomElementFn: defineSignalCombobox,
  inputs: ['clearable', 'closeOnSelect', 'creatable', 'defaultValue', 'disabled', 'loading', 'maxSelected', 'mode', 'options', 'placeholder', 'searchable', 'value']
})
@Component({
  selector: 'signal-combobox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearable', 'closeOnSelect', 'creatable', 'defaultValue', 'disabled', 'loading', 'maxSelected', 'mode', 'options', 'placeholder', 'searchable', 'value'],
  outputs: ['valueChange', 'openChange', 'queryChange', 'clear'],
})
export class SignalCombobox {
  protected el: HTMLSignalComboboxElement;
  @Output() valueChange = new EventEmitter<CustomEvent<{ value: string | string[] | null }>>();
  @Output() openChange = new EventEmitter<CustomEvent<{ open: boolean }>>();
  @Output() queryChange = new EventEmitter<CustomEvent<{ query: string }>>();
  @Output() clear = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SignalCombobox extends Components.SignalCombobox {

  valueChange: EventEmitter<CustomEvent<{ value: string | string[] | null }>>;

  openChange: EventEmitter<CustomEvent<{ open: boolean }>>;

  queryChange: EventEmitter<CustomEvent<{ query: string }>>;

  clear: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSignalInput,
  inputs: ['autocomplete', 'disabled', 'inset', 'name', 'placeholder', 'readonly', 'required', 'type', 'value']
})
@Component({
  selector: 'signal-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autocomplete', 'disabled', 'inset', 'name', 'placeholder', 'readonly', 'required', 'type', 'value'],
  outputs: ['valueInput', 'valueChange'],
})
export class SignalInput {
  protected el: HTMLSignalInputElement;
  @Output() valueInput = new EventEmitter<CustomEvent<{ value: string }>>();
  @Output() valueChange = new EventEmitter<CustomEvent<{ value: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SignalInput extends Components.SignalInput {

  valueInput: EventEmitter<CustomEvent<{ value: string }>>;

  valueChange: EventEmitter<CustomEvent<{ value: string }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSignalModal,
  inputs: ['closeOnBackdrop', 'closeOnEsc', 'confirmText', 'defaultPosition', 'defaultSize', 'description', 'dragEnabled', 'fullscreen', 'heading', 'maxSize', 'minSize', 'open', 'resizable', 'showConfirm', 'showHeaderControls', 'size']
})
@Component({
  selector: 'signal-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closeOnBackdrop', 'closeOnEsc', 'confirmText', 'defaultPosition', 'defaultSize', 'description', 'dragEnabled', 'fullscreen', 'heading', 'maxSize', 'minSize', 'open', 'resizable', 'showConfirm', 'showHeaderControls', 'size'],
  outputs: ['openChange', 'close', 'confirm'],
})
export class SignalModal {
  protected el: HTMLSignalModalElement;
  @Output() openChange = new EventEmitter<CustomEvent<{ open: boolean }>>();
  @Output() close = new EventEmitter<CustomEvent<void>>();
  @Output() confirm = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SignalModal extends Components.SignalModal {

  openChange: EventEmitter<CustomEvent<{ open: boolean }>>;

  close: EventEmitter<CustomEvent<void>>;

  confirm: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSignalTable,
  inputs: ['caption', 'columns', 'emptyText', 'filterable', 'filters', 'loading', 'reorderable', 'rowKey', 'rows', 'searchable']
})
@Component({
  selector: 'signal-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['caption', 'columns', 'emptyText', 'filterable', 'filters', 'loading', 'reorderable', 'rowKey', 'rows', 'searchable'],
  outputs: ['rowClick', 'reorder', 'searchChange', 'filterChange'],
})
export class SignalTable {
  protected el: HTMLSignalTableElement;
  @Output() rowClick = new EventEmitter<CustomEvent<{ row: Record<string, unknown> }>>();
  @Output() reorder = new EventEmitter<CustomEvent<{ rows: Record<string, unknown>[] }>>();
  @Output() searchChange = new EventEmitter<CustomEvent<{ query: string }>>();
  @Output() filterChange = new EventEmitter<CustomEvent<{ filters: Record<string, string> }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SignalTable extends Components.SignalTable {

  rowClick: EventEmitter<CustomEvent<{ row: Record<string, unknown> }>>;

  reorder: EventEmitter<CustomEvent<{ rows: Record<string, unknown>[] }>>;

  searchChange: EventEmitter<CustomEvent<{ query: string }>>;

  filterChange: EventEmitter<CustomEvent<{ filters: Record<string, string> }>>;
}


