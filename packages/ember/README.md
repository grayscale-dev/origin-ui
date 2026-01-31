# @signal-web-ui/ember

Ember addon for Signal UI web components (Ember 3.17 → latest).

## Install

```bash
pnpm add @signal-web-ui/ember @signal-web-ui/core
```

## Usage

The addon registers custom elements at app startup.

```hbs
<SignalButton @onClick={{this.handleClick}}>Save</SignalButton>
<SignalInput @value={{this.name}} @onValueChange={{this.onValueChange}} />
```

### Custom elements

If you prefer using the elements directly, the initializer automatically runs:

```ts
import { applyPolyfills, defineCustomElements } from "@signal-web-ui/core/loader";

applyPolyfills().then(() => defineCustomElements());
```

### Glimmer wrappers

Wrappers forward attributes, set properties for non-string values, and map custom events:

- `SignalInput`: `@onValueInput`, `@onValueChange`
- `SignalFileUpload`: `@onSelect`, `@onUpload`, `@onRemove`
- `SignalCombobox`: `@onValueChange`, `@onOpenChange`, `@onQueryChange`, `@onClear`
- `SignalModal`: `@onOpenChange`, `@onClose`, `@onConfirm`
- `SignalTable`: `@onRowClick`, `@onReorder`, `@onSearchChange`, `@onFilterChange`
