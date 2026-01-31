# signal-data-table

Lightweight data table for read-only datasets.

## Props

- `columns: { key: string; header: string; align?: "left" | "center" | "right"; render?: (row) => any }[]`
- `rows: Record<string, unknown>[]`
- `caption?: string`
- `emptyText?: string = "No results"`
- `getRowId?: (row, index) => string | number`

## Events

- `rowClick` — detail: `{ row }`

## Slots

- `header-{key}` — override a column header
- `cell-{key}` — override a cell for a column
- `empty` — custom empty state

## Notes for wrappers

- React/Vue/Angular wrappers pass functions for `render` and `getRowId` as properties.
- In plain HTML, prefer slots for custom cell or header content.
