# signal-file-upload



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type                         | Default     |
| ---------- | ----------- | ----------- | ---------------------------- | ----------- |
| `accept`   | `accept`    |             | `string \| undefined`        | `undefined` |
| `disabled` | `disabled`  |             | `boolean`                    | `false`     |
| `maxFiles` | `max-files` |             | `number \| undefined`        | `undefined` |
| `maxSize`  | `max-size`  |             | `number \| undefined`        | `undefined` |
| `multiple` | `multiple`  |             | `boolean`                    | `false`     |
| `previews` | --          |             | `FilePreview[] \| undefined` | `undefined` |
| `progress` | `progress`  |             | `number \| undefined`        | `undefined` |
| `value`    | --          |             | `File[] \| undefined`        | `undefined` |


## Events

| Event        | Description | Type                              |
| ------------ | ----------- | --------------------------------- |
| `fileSelect` |             | `CustomEvent<{ files: File[]; }>` |
| `remove`     |             | `CustomEvent<{ file: File; }>`    |
| `upload`     |             | `CustomEvent<{ files: File[]; }>` |


## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"dropzone"`       |             |
| `"hint"`           |             |
| `"input"`          |             |
| `"item"`           |             |
| `"item-name"`      |             |
| `"item-remove"`    |             |
| `"item-size"`      |             |
| `"list"`           |             |
| `"progress"`       |             |
| `"progress-bar"`   |             |
| `"progress-label"` |             |
| `"root"`           |             |
| `"title"`          |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
