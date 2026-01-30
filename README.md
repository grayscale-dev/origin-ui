# signal-ui

## Changesets

This repo uses Changesets with a fixed versioning strategy (all publishable packages share the same version).

### Add a changeset

```bash
pnpm changeset
```

### Version packages

```bash
pnpm version-packages
```

### Release

```bash
pnpm release
```

## CDN example

A simple CDN smoke test lives at `examples/cdn/index.html`.

### Run locally

```bash
python -m http.server 8080
```

Then open:

- http://localhost:8080/examples/cdn/

### Update version

Replace `__VERSION__` in `examples/cdn/index.html` with the published version (for example, `0.1.0`).
