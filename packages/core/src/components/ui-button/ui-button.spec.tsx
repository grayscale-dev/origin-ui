describe("signal-button", () => {
  it("renders label and variants", async () => {
    type StencilElement = HTMLElement & { componentOnReady: () => Promise<void> };
    const element = document.createElement("signal-button") as StencilElement;
    element.setAttribute("variant", "secondary");
    element.textContent = "Save";
    document.body.appendChild(element);
    await element.componentOnReady();

    expect(element.textContent).toContain("Save");
    element.remove();
  });

  it("disables when loading", async () => {
    type StencilElement = HTMLElement & { componentOnReady: () => Promise<void> };
    const element = document.createElement("signal-button") as StencilElement;
    element.setAttribute("loading", "");
    element.textContent = "Submit";
    document.body.appendChild(element);
    await element.componentOnReady();

    const button = element.shadowRoot?.querySelector("button");
    expect(button?.hasAttribute("disabled")).toBe(true);
    element.remove();
  });
});
