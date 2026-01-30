# signal-table



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                        | Default        |
| ------------- | ------------- | ----------- | --------------------------- | -------------- |
| `caption`     | `caption`     |             | `string \| undefined`       | `undefined`    |
| `columns`     | --            |             | `TableColumn[]`             | `[]`           |
| `emptyText`   | `empty-text`  |             | `string`                    | `"No results"` |
| `filterable`  | `filterable`  |             | `boolean`                   | `false`        |
| `filters`     | --            |             | `TableFilter[]`             | `[]`           |
| `loading`     | `loading`     |             | `boolean`                   | `false`        |
| `reorderable` | `reorderable` |             | `boolean`                   | `false`        |
| `rowKey`      | `row-key`     |             | `string \| undefined`       | `undefined`    |
| `rows`        | --            |             | `Record<string, unknown>[]` | `[]`           |
| `searchable`  | `searchable`  |             | `boolean`                   | `false`        |


## Events

| Event          | Description | Type                                                |
| -------------- | ----------- | --------------------------------------------------- |
| `filterChange` |             | `CustomEvent<{ filters: Record<string, string>; }>` |
| `reorder`      |             | `CustomEvent<{ rows: Record<string, unknown>[]; }>` |
| `rowClick`     |             | `CustomEvent<{ row: Record<string, unknown>; }>`    |
| `searchChange` |             | `CustomEvent<{ query: string; }>`                   |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"caption"`       |             |
| `"cell"`          |             |
| `"container"`     |             |
| `"filter"`        |             |
| `"filter-select"` |             |
| `"filters"`       |             |
| `"head-cell"`     |             |
| `"head-row"`      |             |
| `"reorder-down"`  |             |
| `"reorder-up"`    |             |
| `"row"`           |             |
| `"search"`        |             |
| `"table"`         |             |
| `"table-wrapper"` |             |
| `"toolbar"`       |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
