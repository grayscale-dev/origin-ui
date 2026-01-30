# @signal-ui/core

Stencil-based Web Components that power Signal UI. Components ship with semantic tokens, light/dark themes, slots, parts, and framework-friendly custom events.

## Installation

```bash
pnpm add @signal-ui/core
```

## CDN usage

Build outputs are located at `dist/signal-ui/signal-ui.esm.js` (module) and `dist/signal-ui/signal-ui.js` (nomodule).

```html
<!-- unpkg -->
<script type="module" src="https://unpkg.com/@signal-ui/core/dist/signal-ui/signal-ui.esm.js"></script>
<script nomodule src="https://unpkg.com/@signal-ui/core/dist/signal-ui/signal-ui.js"></script>

<!-- jsDelivr -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@signal-ui/core/dist/signal-ui/signal-ui.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@signal-ui/core/dist/signal-ui/signal-ui.js"></script>

<signal-button>Primary</signal-button>
```

## npm usage (loader)

```ts
import { applyPolyfills, defineCustomElements } from "@signal-ui/core/loader";

applyPolyfills().then(() => defineCustomElements());
```

```html
<signal-button>Primary</signal-button>
<signal-input placeholder="Search"></signal-input>
<signal-combobox id="team"></signal-combobox>
<signal-modal id="modal" heading="Details"></signal-modal>
<signal-table id="table"></signal-table>

<script type="module">
  const combo = document.querySelector("#team");
  combo.options = [
    { value: "alpha", label: "Alpha" },
    { value: "beta", label: "Beta" }
  ];

  const table = document.querySelector("#table");
  table.columns = [
    { key: "name", header: "Name" },
    { key: "role", header: "Role" }
  ];
  table.rows = [
    { id: "1", name: "Ada", role: "Engineer" },
    { id: "2", name: "Grace", role: "Manager" }
  ];
</script>
```

## Framework usage notes

- **React**: call `defineCustomElements()` once on the client. Complex props (arrays/objects) should be set as element properties. Custom events map to `onValueChange`, `onOpenChange`, etc.
- **Vue**: call `defineCustomElements()` in `main.ts` and bind complex props with `:prop` to set properties. Listen with `@valueChange`, `@openChange`.
- **Angular**: call `defineCustomElements()` in `main.ts`, add `CUSTOM_ELEMENTS_SCHEMA`, and bind with `[property]`. Listen with `(valueChange)`.
- **Svelte**: call `defineCustomElements()` in `onMount`, use `bind:this` for complex props and `on:valueChange` for events.

## Theming

Tokens are exposed as CSS variables. Theme can be toggled by adding `data-signal-theme="light|dark"` to `html` or `body`.

```css
:root {
  --signal-color-bg: #f6f8fa;
  --signal-color-surface: #ffffff;
  --signal-color-text: #1f2328;
  /* ... */
}

[data-signal-theme="dark"] {
  color-scheme: dark;
}
```

```html
<body data-signal-theme="dark">
  <signal-button>Dark</signal-button>
</body>
```

### Token reference

- `--signal-color-bg`, `--signal-color-surface`, `--signal-color-muted`, `--signal-color-border`
- `--signal-color-text`, `--signal-color-subtle`, `--signal-color-accent`, `--signal-color-accent-strong`
- `--signal-color-success`, `--signal-color-warning`, `--signal-color-danger`, `--signal-color-overlay`
- `--signal-shadow-soft`, `--signal-shadow-strong`, `--signal-shadow-focus`
- `--signal-radius-xs`, `--signal-radius-sm`, `--signal-radius-md`, `--signal-radius-lg`, `--signal-radius-full`
- `--signal-space-0` through `--signal-space-24`

## Components

### `<signal-button>`

Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `primary \| secondary \| ghost \| subtle \| danger` | `primary` | Visual style |
| `size` | `sm \| md \| lg` | `md` | Size scale |
| `loading` | `boolean` | `false` | Shows spinner, disables |
| `disabled` | `boolean` | `false` | Disables button |
| `type` | `button \| submit \| reset` | `button` | Native button type |

Events

| Event | Detail |
| --- | --- |
| `click` | native button event |

Slots

| Slot | Purpose |
| --- | --- |
| default | Button label |
| `icon-left` | Left icon |
| `icon-right` | Right icon |

Parts

| Part | Description |
| --- | --- |
| `button` | The button element |
| `spinner` | Loading indicator |
| `label` | Label wrapper |
| `icon-left`, `icon-right` | Icon wrappers |

### `<signal-input>`

Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `string` | `""` | Controlled value |
| `placeholder` | `string` | `""` | Placeholder text |
| `type` | `string` | `text` | Input type |
| `disabled` | `boolean` | `false` | Disables input |
| `readonly` | `boolean` | `false` | Read-only state |
| `required` | `boolean` | `false` | Required input |
| `inset` | `boolean` | `false` | Muted surface style |

Events

| Event | Detail |
| --- | --- |
| `valueInput` | `{ value }` |
| `valueChange` | `{ value }` |

Slots

| Slot | Purpose |
| --- | --- |
| `prefix` | Prefix icon or text |
| `suffix` | Suffix icon or text |

Parts

| Part | Description |
| --- | --- |
| `field` | Wrapper |
| `input` | Input element |
| `prefix`, `suffix` | Slot wrappers |

### `<signal-combobox>`

Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `options` | `ComboboxOption[]` | `[]` | Set via property only |
| `value` | `string \| string[] \| null` | `undefined` | Controlled selection |
| `defaultValue` | `string \| string[] \| null` | `undefined` | Uncontrolled selection |
| `mode` | `single \| multi` | `single` | Selection mode |
| `placeholder` | `string` | `Select` | Placeholder text |
| `disabled` | `boolean` | `false` | Disables control |
| `loading` | `boolean` | `false` | Shows loading state |
| `clearable` | `boolean` | `false` | Clears selection |
| `searchable` | `boolean` | `true` | Enables query input |
| `creatable` | `boolean` | `false` | Allows creating new values |
| `maxSelected` | `number` | `undefined` | Caps multi selections |
| `closeOnSelect` | `boolean` | `false` for multi | Closes after select |

Events

| Event | Detail |
| --- | --- |
| `valueChange` | `{ value }` |
| `openChange` | `{ open }` |
| `queryChange` | `{ query }` |
| `clear` | `void` |

Parts

| Part | Description |
| --- | --- |
| `container`, `control`, `trigger` | Structure wrappers |
| `input` | Search input |
| `listbox` | Options list |
| `option`, `option-selected` | Option rows |
| `clear`, `caret`, `value` | Control elements |

### `<signal-modal>`

Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Controls visibility |
| `heading` | `string` | `""` | Header title |
| `description` | `string` | `""` | Header description |
| `size` | `sm \| md \| lg` | `md` | Size preset |
| `closeOnBackdrop` | `boolean` | `true` | Click backdrop to close |
| `closeOnEsc` | `boolean` | `true` | ESC to close |
| `dragEnabled` | `boolean` | `false` | Drag by header |
| `resizable` | `boolean` | `false` | Resize via handle |
| `fullscreen` | `boolean` | `false` | Fullscreen mode |
| `showHeaderControls` | `boolean` | `true` | Show confirm/close |
| `showConfirm` | `boolean` | `false` | Show confirm button |

Events

| Event | Detail |
| --- | --- |
| `openChange` | `{ open }` |
| `close` | `void` |
| `confirm` | `void` |

Slots

| Slot | Purpose |
| --- | --- |
| default | Modal body |
| `header` | Custom header content |
| `footer` | Footer content |

Parts

| Part | Description |
| --- | --- |
| `overlay`, `backdrop`, `dialog` | Modal structure |
| `header`, `body`, `footer` | Content regions |
| `resize-handle` | Resize grip |

### `<signal-table>`

Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `columns` | `TableColumn[]` | `[]` | Set via property only |
| `rows` | `Record<string, unknown>[]` | `[]` | Set via property only |
| `caption` | `string` | `""` | Optional caption |
| `rowKey` | `string` | `""` | Row id field |
| `searchable` | `boolean` | `false` | Shows search field |
| `filterable` | `boolean` | `false` | Shows filter UI |
| `filters` | `TableFilter[]` | `[]` | Filter definitions |
| `reorderable` | `boolean` | `false` | Enables up/down controls |
| `loading` | `boolean` | `false` | Loading state |

Events

| Event | Detail |
| --- | --- |
| `rowClick` | `{ row }` |
| `reorder` | `{ rows }` |
| `searchChange` | `{ query }` |
| `filterChange` | `{ filters }` |

Slots

| Slot | Purpose |
| --- | --- |
| `empty` | Empty state content |
| `filters` | Additional filter controls |

Parts

| Part | Description |
| --- | --- |
| `container`, `toolbar`, `table`, `caption` | Layout wrappers |
| `head-row`, `head-cell`, `row`, `cell` | Table elements |
| `search`, `filters`, `filter-select` | Toolbar controls |

## Accessibility notes

- All controls expose ARIA roles and focus styles.
- Modal traps focus and returns focus on close.
- Combobox uses `role="listbox"` with keyboard navigation.
- Input and Button respect native disabled and focus behavior.
