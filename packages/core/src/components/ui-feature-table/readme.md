# signal-feature-table



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute    | Description | Type                                                                                 | Default        |
| -------------- | ------------ | ----------- | ------------------------------------------------------------------------------------ | -------------- |
| `caption`      | `caption`    |             | `string \| undefined`                                                                | `undefined`    |
| `columns`      | --           |             | `FeatureTableColumn[]`                                                               | `[]`           |
| `emptyText`    | `empty-text` |             | `string`                                                                             | `"No results"` |
| `filterable`   | `filterable` |             | `boolean`                                                                            | `false`        |
| `filters`      | --           |             | `FeatureTableFilter[]`                                                               | `[]`           |
| `loading`      | `loading`    |             | `boolean`                                                                            | `false`        |
| `pagination`   | --           |             | `undefined \| { pageIndex: number; pageSize: number; total?: number \| undefined; }` | `undefined`    |
| `rowKey`       | `row-key`    |             | `((row: Record<string, unknown>) => string) \| string \| undefined`                  | `undefined`    |
| `rows`         | --           |             | `Record<string, unknown>[]`                                                          | `[]`           |
| `searchable`   | `searchable` |             | `boolean`                                                                            | `false`        |
| `selectable`   | `selectable` |             | `boolean`                                                                            | `false`        |
| `selectedKeys` | --           |             | `string[]`                                                                           | `[]`           |


## Events

| Event              | Description | Type                                                                                 |
| ------------------ | ----------- | ------------------------------------------------------------------------------------ |
| `filterChange`     |             | `CustomEvent<{ filters: Record<string, string>; }>`                                  |
| `pageChange`       |             | `CustomEvent<{ pageIndex: number; pageSize: number; }>`                              |
| `rowClick`         |             | `CustomEvent<{ row: Record<string, unknown>; }>`                                     |
| `searchChange`     |             | `CustomEvent<{ query: string; }>`                                                    |
| `selectionChanged` |             | `CustomEvent<{ keys: string[]; }>`                                                   |
| `sortChange`       |             | `CustomEvent<{ sort?: { key: string; direction: "desc" \| "asc"; } \| undefined; }>` |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"body"`       |             |
| `"caption"`    |             |
| `"cell"`       |             |
| `"head"`       |             |
| `"header"`     |             |
| `"page-next"`  |             |
| `"page-prev"`  |             |
| `"pagination"` |             |
| `"root"`       |             |
| `"row"`        |             |
| `"search"`     |             |
| `"table"`      |             |
| `"toolbar"`    |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
