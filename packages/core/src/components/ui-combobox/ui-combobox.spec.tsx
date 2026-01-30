describe("signal-combobox", () => {
  it("opens and selects option", async () => {
    type StencilElement = HTMLElement & { componentOnReady: () => Promise<void> };
    const root = document.createElement("signal-combobox") as StencilElement & {
      options: { value: string; label: string }[];
    };
    document.body.appendChild(root);
    await root.componentOnReady();

    root.options = [
      { value: "alpha", label: "Alpha" },
      { value: "beta", label: "Beta" },
    ];
    await new Promise((resolve) => setTimeout(resolve, 10));

    const changeSpy = vi.fn();
    root.addEventListener("valueChange", changeSpy);

    const trigger = root.shadowRoot?.querySelector("button") as HTMLButtonElement;
    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 20));

    const options = root.shadowRoot?.querySelectorAll(".option");
    expect(options?.length).toBe(2);

    (options?.[0] as HTMLElement).click();
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(changeSpy).toHaveBeenCalled();
    root.remove();
  });
});
