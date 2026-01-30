# signal-combobox



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description | Type                                      | Default     |
| --------------- | ----------------- | ----------- | ----------------------------------------- | ----------- |
| `clearable`     | `clearable`       |             | `boolean`                                 | `false`     |
| `closeOnSelect` | `close-on-select` |             | `boolean \| undefined`                    | `undefined` |
| `creatable`     | `creatable`       |             | `boolean`                                 | `false`     |
| `defaultValue`  | `default-value`   |             | `null \| string \| string[] \| undefined` | `undefined` |
| `disabled`      | `disabled`        |             | `boolean`                                 | `false`     |
| `loading`       | `loading`         |             | `boolean`                                 | `false`     |
| `maxSelected`   | `max-selected`    |             | `number \| undefined`                     | `undefined` |
| `mode`          | `mode`            |             | `"multi" \| "single"`                     | `"single"`  |
| `options`       | --                |             | `ComboboxOption[]`                        | `[]`        |
| `placeholder`   | `placeholder`     |             | `string`                                  | `"Select"`  |
| `searchable`    | `searchable`      |             | `boolean`                                 | `true`      |
| `value`         | `value`           |             | `null \| string \| string[] \| undefined` | `undefined` |


## Events

| Event         | Description | Type                                                  |
| ------------- | ----------- | ----------------------------------------------------- |
| `clear`       |             | `CustomEvent<void>`                                   |
| `openChange`  |             | `CustomEvent<{ open: boolean; }>`                     |
| `queryChange` |             | `CustomEvent<{ query: string; }>`                     |
| `valueChange` |             | `CustomEvent<{ value: string \| string[] \| null; }>` |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"caret"`         |             |
| `"clear"`         |             |
| `"container"`     |             |
| `"control"`       |             |
| `"empty"`         |             |
| `"input"`         |             |
| `"listbox"`       |             |
| `"option"`        |             |
| `"option-create"` |             |
| `"trigger"`       |             |
| `"value"`         |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
