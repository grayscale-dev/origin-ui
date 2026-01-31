import { Component, Element, Event, h, Prop, State } from "@stencil/core";
import type { EventEmitter } from "@stencil/core";

let fileUploadId = 0;

export type FilePreview = {
  name: string;
  url?: string;
  size?: number;
};

@Component({
  tag: "signal-file-upload",
  styleUrl: "ui-file-upload.css",
  shadow: true,
})
export class SignalFileUpload {
  @Element() host!: HTMLElement;

  @Prop() accept?: string;
  @Prop() multiple = false;
  @Prop() maxSize?: number;
  @Prop() maxFiles?: number;
  @Prop() value?: File[];
  @Prop() previews?: FilePreview[];
  @Prop() progress?: number;
  @Prop({ reflect: true }) disabled = false;

  @State() dragging = false;

  private readonly inputId = `signal-file-upload-input-${fileUploadId++}`;

  @Event({ eventName: "fileSelect", bubbles: true, composed: true })
  fileSelect!: EventEmitter<{ files: File[] }>;
  @Event({ eventName: "upload", bubbles: true, composed: true })
  upload!: EventEmitter<{ files: File[] }>;
  @Event({ eventName: "remove", bubbles: true, composed: true })
  remove!: EventEmitter<{ file: File }>;

  private handleFiles = (list: FileList | null) => {
    if (!list) return;
    let files = Array.from(list);
    if (this.maxSize) {
      files = files.filter((file) => file.size <= this.maxSize!);
    }
    if (this.maxFiles) {
      files = files.slice(0, this.maxFiles);
    }
    this.fileSelect.emit({ files });
    this.upload.emit({ files });
  };

  private handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    this.dragging = true;
  };

  private handleDragLeave = () => {
    this.dragging = false;
  };

  private handleDrop = (event: DragEvent) => {
    event.preventDefault();
    this.dragging = false;
    this.handleFiles(event.dataTransfer?.files ?? null);
  };

  private get labelText() {
    if (this.maxSize) {
      return `Max file size ${(this.maxSize / 1024 / 1024).toFixed(1)} MB`;
    }
    return "Drop files here or browse";
  }

  private get previewItems() {
    if (this.previews && this.previews.length > 0) return this.previews;
    const files = this.value ?? [];
    return files.map((file) => ({ name: file.name, size: file.size }));
  }

  private handleRemove = (name: string) => {
    const files = this.value ?? [];
    const match = files.find((file) => file.name === name);
    if (match) this.remove.emit({ file: match });
  };

  render() {
    const previews = this.previewItems;

    return (
      <div part="root" class="root">
        <label
          part="dropzone"
          class={{
            dropzone: true,
            dragging: this.dragging,
            disabled: this.disabled,
          }}
          aria-label={this.labelText}
          htmlFor={this.inputId}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
        >
          <slot>
            <div part="title" class="title">Drop files here or browse</div>
            <div part="hint" class="hint">{this.labelText}</div>
          </slot>
          <input
            part="input"
            class="input"
            type="file"
            id={this.inputId}
            accept={this.accept}
            multiple={this.multiple}
            disabled={this.disabled}
            onChange={(event) => this.handleFiles((event.target as HTMLInputElement).files)}
          />
        </label>

        {this.progress !== undefined && (
          <div part="progress" class="progress">
            <div part="progress-bar" class="progress-bar" style={{ width: `${this.progress}%` }} />
            <span part="progress-label" class="progress-label">{this.progress}%</span>
          </div>
        )}

        {previews.length > 0 && (
          <div part="list" class="list">
            {previews.map((file) => (
              <div part="item" class="item" key={file.name}>
                <div class="item-meta">
                  <div part="item-name" class="item-name">{file.name}</div>
                  {file.size !== undefined && (
                    <div part="item-size" class="item-size">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  )}
                </div>
                {this.value && this.value.length > 0 && (
                  <button
                    part="item-remove"
                    class="item-remove"
                    type="button"
                    onClick={() => this.handleRemove(file.name)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
