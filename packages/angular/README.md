# @signal-ui/angular

Angular wrappers for Signal UI web components.

## Install

```bash
pnpm add @signal-ui/angular @signal-ui/core
```

## Usage

```ts
import { defineCustomElements } from "@signal-ui/core/loader";
import { SignalUiModule } from "@signal-ui/angular";

defineCustomElements();
```

```ts
@NgModule({
  imports: [SignalUiModule]
})
export class AppModule {}
```

Notes:
- Add `CUSTOM_ELEMENTS_SCHEMA` if you do not import `SignalUiModule`.
- Use property bindings like `[options]` for arrays/objects.
- Listen to custom events like `(valueChange)` and `(openChange)`.
