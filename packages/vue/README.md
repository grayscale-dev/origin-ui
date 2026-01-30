# @signal-ui/vue

Vue wrappers for Signal UI web components.

## Install

```bash
pnpm add @signal-ui/vue @signal-ui/core
```

## Usage

```ts
import { defineCustomElements } from "@signal-ui/core/loader";

defineCustomElements();
```

```vue
<template>
  <SignalButton @click="onClick">Hello</SignalButton>
</template>
```

Notes:
- Bind complex props with `:prop` to set properties.
- Listen to custom events like `@valueChange` and `@openChange`.
