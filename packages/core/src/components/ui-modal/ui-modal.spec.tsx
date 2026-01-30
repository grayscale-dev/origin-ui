describe("signal-modal", () => {
  it("renders when open and closes on escape", async () => {
    type StencilElement = HTMLElement & { componentOnReady: () => Promise<void> };
    const root = document.createElement("signal-modal") as StencilElement & { open: boolean };
    root.setAttribute("open", "");
    root.setAttribute("heading", "Dialog");
    document.body.appendChild(root);
    await root.componentOnReady();

    const closeSpy = vi.fn();
    root.addEventListener("close", closeSpy);

    expect(root.shadowRoot?.querySelector(".dialog")).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(closeSpy).toHaveBeenCalled();
    root.remove();
  });
});
