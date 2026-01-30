# signal-modal



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description | Type                                              | Default     |
| -------------------- | ---------------------- | ----------- | ------------------------------------------------- | ----------- |
| `closeOnBackdrop`    | `close-on-backdrop`    |             | `boolean`                                         | `true`      |
| `closeOnEsc`         | `close-on-esc`         |             | `boolean`                                         | `true`      |
| `confirmText`        | `confirm-text`         |             | `string`                                          | `"Confirm"` |
| `defaultPosition`    | --                     |             | `undefined \| { x: number; y: number; }`          | `undefined` |
| `defaultSize`        | --                     |             | `undefined \| { width: number; height: number; }` | `undefined` |
| `description`        | `description`          |             | `string \| undefined`                             | `undefined` |
| `dragEnabled`        | `drag-enabled`         |             | `boolean`                                         | `false`     |
| `fullscreen`         | `fullscreen`           |             | `boolean`                                         | `false`     |
| `heading`            | `heading`              |             | `string \| undefined`                             | `undefined` |
| `maxSize`            | --                     |             | `undefined \| { width: number; height: number; }` | `undefined` |
| `minSize`            | --                     |             | `undefined \| { width: number; height: number; }` | `undefined` |
| `open`               | `open`                 |             | `boolean`                                         | `false`     |
| `resizable`          | `resizable`            |             | `boolean`                                         | `false`     |
| `showConfirm`        | `show-confirm`         |             | `boolean`                                         | `false`     |
| `showHeaderControls` | `show-header-controls` |             | `boolean`                                         | `true`      |
| `size`               | `size`                 |             | `"lg" \| "md" \| "sm"`                            | `"md"`      |


## Events

| Event        | Description | Type                              |
| ------------ | ----------- | --------------------------------- |
| `close`      |             | `CustomEvent<void>`               |
| `confirm`    |             | `CustomEvent<void>`               |
| `openChange` |             | `CustomEvent<{ open: boolean; }>` |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"backdrop"`      |             |
| `"body"`          |             |
| `"dialog"`        |             |
| `"footer"`        |             |
| `"header"`        |             |
| `"overlay"`       |             |
| `"resize-handle"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
