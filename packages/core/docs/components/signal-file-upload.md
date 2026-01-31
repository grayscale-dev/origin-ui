---
title: Signal File Upload
component: signal-file-upload
package: @signal-web-ui/core
---

# signal-file-upload

A drag-and-drop file upload component with optional previews and progress display.

## Usage

```html
<signal-file-upload id="uploader"></signal-file-upload>
<script type="module">
  const uploader = document.querySelector('#uploader');
  uploader.addEventListener('fileSelect', (event) => {
    console.log('selected files', event.detail.files);
  });
</script>
```

## Props

- `accept`: `string` (optional)
- `multiple`: `boolean` (default: `false`)
- `maxSize`: `number` (optional, bytes)
- `maxFiles`: `number` (optional)
- `value`: `File[]` (optional)
- `previews`: `{ name: string; url?: string; size?: number }[]` (optional)
- `progress`: `number` (optional, 0-100)
- `disabled`: `boolean` (default: `false`)

## Events

- `fileSelect`: `{ files: File[] }`
- `upload`: `{ files: File[] }`
- `remove`: `{ file: File }`

## Slots

- default: custom dropzone content (replaces default title/hint)

## CSS Parts

- `root`, `dropzone`, `title`, `hint`, `input`, `progress`, `progress-bar`, `progress-label`, `list`, `item`, `item-name`, `item-size`, `item-remove`

## Notes

- `select` and `upload` both emit when files are chosen.
- `remove` only fires when `value` is provided (the component resolves the file by name).
