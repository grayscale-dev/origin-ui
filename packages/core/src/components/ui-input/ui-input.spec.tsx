describe("signal-input", () => {
  it("emits input and change events", async () => {
    type StencilElement = HTMLElement & { componentOnReady: () => Promise<void> };
    const element = document.createElement("signal-input") as StencilElement;
    document.body.appendChild(element);
    await element.componentOnReady();

    const input = element.shadowRoot?.querySelector("input") as HTMLInputElement;
    const inputSpy = vi.fn();
    const changeSpy = vi.fn();

    element.addEventListener("valueInput", inputSpy);
    element.addEventListener("valueChange", changeSpy);

    input.value = "hello";
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new Event("change"));

    expect(inputSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
    element.remove();
  });
});
