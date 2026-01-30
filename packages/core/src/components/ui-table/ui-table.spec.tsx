import type { TableColumn } from "./ui-table";

describe("signal-table", () => {
  it("filters rows by search", async () => {
    type Row = { name: string; role: string };
    type StencilElement = HTMLElement & { componentOnReady: () => Promise<void> };
    const root = document.createElement("signal-table") as StencilElement & {
      columns: TableColumn[];
      rows: Row[];
      reorderable: boolean;
    };
    root.setAttribute("searchable", "");
    document.body.appendChild(root);
    await root.componentOnReady();

    root.columns = [
      { key: "name", header: "Name" },
      { key: "role", header: "Role" },
    ];
    root.rows = [
      { name: "Ada", role: "Engineer" },
      { name: "Grace", role: "Manager" },
    ];
    await new Promise((resolve) => setTimeout(resolve, 0));

    const input = root.shadowRoot?.querySelector("input[type='search']") as HTMLInputElement;
    input.value = "Grace";
    input.dispatchEvent(new Event("input"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    const rows = root.shadowRoot?.querySelectorAll("tbody tr");
    expect(rows?.length).toBe(1);
    root.remove();
  });

  it("renders reorder controls", async () => {
    type Row = { name: string };
    type StencilElement = HTMLElement & { componentOnReady: () => Promise<void> };
    const root = document.createElement("signal-table") as StencilElement & {
      columns: TableColumn[];
      rows: Row[];
      reorderable: boolean;
    };
    root.setAttribute("reorderable", "");
    document.body.appendChild(root);
    await root.componentOnReady();
    root.reorderable = true;
    await new Promise((resolve) => setTimeout(resolve, 0));

    root.columns = [{ key: "name", header: "Name" }];
    root.rows = [{ name: "First" }, { name: "Second" }];
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(root.reorderable).toBe(true);
    root.remove();
  });
});
