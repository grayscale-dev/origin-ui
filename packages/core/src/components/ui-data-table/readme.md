# signal-data-table



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                                                                               | Default        |
| ----------- | ------------ | ----------- | ---------------------------------------------------------------------------------- | -------------- |
| `caption`   | `caption`    |             | `string \| undefined`                                                              | `undefined`    |
| `columns`   | --           |             | `DataTableColumn[]`                                                                | `[]`           |
| `emptyText` | `empty-text` |             | `string`                                                                           | `"No results"` |
| `getRowId`  | --           |             | `((row: Record<string, unknown>, index: number) => string \| number) \| undefined` | `undefined`    |
| `rows`      | --           |             | `Record<string, unknown>[]`                                                        | `[]`           |


## Events

| Event      | Description | Type                                             |
| ---------- | ----------- | ------------------------------------------------ |
| `rowClick` |             | `CustomEvent<{ row: Record<string, unknown>; }>` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"body"`    |             |
| `"caption"` |             |
| `"cell"`    |             |
| `"empty"`   |             |
| `"head"`    |             |
| `"header"`  |             |
| `"root"`    |             |
| `"row"`     |             |
| `"table"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
