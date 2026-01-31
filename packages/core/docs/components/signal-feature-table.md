# signal-feature-table

Feature-rich table with search, sorting, filtering, selection, and pagination.

## Props

- `columns: { key: string; header: string; sortable?: boolean; align?: "left" | "center" | "right"; width?: string; render?: (row) => Renderable }[]`
- `rows: Record<string, unknown>[]`
- `caption?: string`
- `rowKey?: string | (row) => string`
- `searchable?: boolean`
- `filterable?: boolean`
- `filters?: { key: string; label: string; options: { value: string; label: string }[]; value?: string }[]`
- `selectable?: boolean`
- `selectedKeys?: string[]`
- `pagination?: { pageIndex: number; pageSize: number; total?: number }`
- `emptyText?: string`
- `loading?: boolean`

## Events

- `rowClick` — `{ row }`
- `selectionChanged` — `{ keys: string[] }`
- `sortChange` — `{ sort?: { key: string; direction: "asc" | "desc" } }`
- `filterChange` — `{ filters: Record<string, string> }`
- `searchChange` — `{ query: string }`
- `pageChange` — `{ pageIndex: number; pageSize: number }`

## Slots

- `header-{key}` — override header cell
- `cell-{key}` — override body cell
- `actions-header` — header for actions column
- `row-actions` — per-row actions slot
- `empty` — empty state
- `loading` — loading state
