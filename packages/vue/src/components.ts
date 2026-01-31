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


export const SignalDataTable: StencilVueComponent<JSX.SignalDataTable> = /*@__PURE__*/ defineContainer<JSX.SignalDataTable>('signal-data-table', undefined, [
  'columns',
  'rows',
  'caption',
  'emptyText',
  'getRowId',
  'rowClick'
], [
  'rowClick'
]);


export const SignalFeatureTable: StencilVueComponent<JSX.SignalFeatureTable> = /*@__PURE__*/ defineContainer<JSX.SignalFeatureTable>('signal-feature-table', undefined, [
  'columns',
  'rows',
  'caption',
  'rowKey',
  'searchable',
  'filterable',
  'selectable',
  'selectedKeys',
  'pagination',
  'emptyText',
  'filters',
  'loading',
  'rowClick',
  'selectionChanged',
  'sortChange',
  'filterChange',
  'searchChange',
  'pageChange'
], [
  'rowClick',
  'selectionChanged',
  'sortChange',
  'filterChange',
  'searchChange',
  'pageChange'
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


export const SignalHeading: StencilVueComponent<JSX.SignalHeading> = /*@__PURE__*/ defineContainer<JSX.SignalHeading>('signal-heading', undefined, [
  'level',
  'align'
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


export const SignalListItem: StencilVueComponent<JSX.SignalListItem> = /*@__PURE__*/ defineContainer<JSX.SignalListItem>('signal-list-item', undefined, [
  'heading',
  'subtitle',
  'href',
  'selected',
  'disabled',
  'itemClick'
], [
  'itemClick'
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


export const SignalSkeleton: StencilVueComponent<JSX.SignalSkeleton> = /*@__PURE__*/ defineContainer<JSX.SignalSkeleton>('signal-skeleton', undefined, [
  'variant',
  'lines',
  'media',
  'heading',
  'description'
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


export const SignalText: StencilVueComponent<JSX.SignalText> = /*@__PURE__*/ defineContainer<JSX.SignalText>('signal-text', undefined, [
  'truncate',
  'clampLines'
]);


export const SignalTooltip: StencilVueComponent<JSX.SignalTooltip> = /*@__PURE__*/ defineContainer<JSX.SignalTooltip>('signal-tooltip', undefined, [
  'content',
  'variant',
  'placement',
  'delay',
  'interactive',
  'disabled'
]);


