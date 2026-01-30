import { describe, expect, it } from "vitest";
import { colors, radii, spacing, themeStyles } from "@signal-ui/design-tokens";

describe("design tokens", () => {
  it("exposes light and dark palettes", () => {
    expect(colors.light.background).toBeDefined();
    expect(colors.dark.text).toContain("#");
  });

  it("maps themeStyles into CSS variables", () => {
    const vars = themeStyles("light");
    expect(vars["--signal-color-bg"]).toBe(colors.light.background);
    expect(vars["--signal-radius-md"]).toBe(radii.md);
    expect(vars["--signal-space-4"]).toBe(spacing[4]);
  });
});
