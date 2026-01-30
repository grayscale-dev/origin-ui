# Release checklist

## Pre-flight
- Confirm versions for all publishable packages in `packages/*/package.json`.
- Run a clean install: `pnpm install`.
- Run `pnpm build` and `pnpm test`.
- Ensure `packages/core/dist/signal-ui/` contains both `signal-ui.esm.js` and `signal-ui.js`.

## Publish order
1) `@signal-ui/design-tokens` (if publishing)
2) `@signal-ui/core`
3) Wrappers: `@signal-ui/react`, `@signal-ui/vue`, `@signal-ui/angular`, `@signal-ui/ember`
4) Tooling packages (if publishing): `@signal-ui/tsconfig`, `@signal-ui/eslint-config`

## Publish commands (pnpm)
- From repo root: `pnpm -r publish --access public --tag latest`
- If doing a dry run: `pnpm -r publish --access public --tag latest --dry-run`

## Post-publish
- Verify CDN assets on unpkg/jsDelivr.
- Smoke test loader:
  - `import { defineCustomElements } from "@signal-ui/core/loader"; defineCustomElements();`
- Smoke test wrappers in a demo app.
