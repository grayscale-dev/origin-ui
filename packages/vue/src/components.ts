/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer, type StencilVueComponent } from '@stencil/vue-output-target/runtime';

import type { JSX } from '@signal-web-ui/core';

import { defineCustomElements } from '@signal-web-ui/core/loader';


defineCustomElements();

export const SignalButton: StencilVueComponent<JSX.SignalButton> = /*@__PURE__*/ defineContainer<JSX.SignalButton>('signal-button', undefined, [
  'variant',
  'size',
  'loading',
  'disabled',
  'type'
]);


export const SignalCombobox: StencilVueComponent<JSX.SignalCombobox> = /*@__PURE__*/ defineContainer<JSX.SignalCombobox>('signal-combobox', undefined, [
  'options',
  'value',
  'defaultValue',
  'mode',
  'placeholder',
  'disabled',
  'loading',
  'clearable',
  'searchable',
  'creatable',
  'maxSelected',
  'closeOnSelect',
  'valueChange',
  'openChange',
  'queryChange',
  'clear'
], [
  'valueChange',
  'openChange',
  'queryChange',
  'clear'
]);


export const SignalFileUpload: StencilVueComponent<JSX.SignalFileUpload> = /*@__PURE__*/ defineContainer<JSX.SignalFileUpload>('signal-file-upload', undefined, [
  'accept',
  'multiple',
  'maxSize',
  'maxFiles',
  'value',
  'previews',
  'progress',
  'disabled',
  'fileSelect',
  'upload',
  'remove'
], [
  'fileSelect',
  'upload',
  'remove'
]);


export const SignalInput: StencilVueComponent<JSX.SignalInput> = /*@__PURE__*/ defineContainer<JSX.SignalInput>('signal-input', undefined, [
  'value',
  'placeholder',
  'name',
  'type',
  'disabled',
  'readonly',
  'required',
  'inset',
  'autocomplete',
  'valueInput',
  'valueChange'
], [
  'valueInput',
  'valueChange'
]);


export const SignalModal: StencilVueComponent<JSX.SignalModal> = /*@__PURE__*/ defineContainer<JSX.SignalModal>('signal-modal', undefined, [
  'open',
  'heading',
  'description',
  'size',
  'closeOnBackdrop',
  'closeOnEsc',
  'dragEnabled',
  'resizable',
  'fullscreen',
  'showHeaderControls',
  'showConfirm',
  'confirmText',
  'defaultSize',
  'minSize',
  'maxSize',
  'defaultPosition',
  'openChange',
  'close',
  'confirm'
], [
  'openChange',
  'close',
  'confirm'
]);


export const SignalTable: StencilVueComponent<JSX.SignalTable> = /*@__PURE__*/ defineContainer<JSX.SignalTable>('signal-table', undefined, [
  'columns',
  'rows',
  'caption',
  'rowKey',
  'searchable',
  'filterable',
  'reorderable',
  'loading',
  'emptyText',
  'filters',
  'rowClick',
  'reorder',
  'searchChange',
  'filterChange'
], [
  'rowClick',
  'reorder',
  'searchChange',
  'filterChange'
]);


