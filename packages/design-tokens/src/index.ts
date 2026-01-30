export type ThemeMode = "light" | "dark";

export const colors = {
  light: {
    background: "#f6f8fa",
    surface: "#ffffff",
    muted: "#f2f4f7",
    border: "#d0d7de",
    text: "#1f2328",
    subtle: "#57606a",
    accent: "#236cff",
    accentStrong: "#1a58d6",
    success: "#2da44e",
    warning: "#bf8700",
    danger: "#d1242f",
    overlay: "rgba(27, 31, 36, 0.35)"
  },
  dark: {
    background: "#0b0f14",
    surface: "#11161d",
    muted: "#151b23",
    border: "#30363d",
    text: "#e6edf3",
    subtle: "#9da7b3",
    accent: "#236cff",
    accentStrong: "#3b82f6",
    success: "#2ea043",
    warning: "#d29922",
    danger: "#f85149",
    overlay: "rgba(0, 0, 0, 0.6)"
  }
};

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px"
};

export const radii = {
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "10px",
  full: "999px"
};

export const shadows = {
  soft: "0 1px 2px rgba(27, 31, 36, 0.1), 0 8px 24px rgba(66, 74, 83, 0.12)",
  strong: "0 12px 28px rgba(27, 31, 36, 0.2), 0 2px 8px rgba(27, 31, 36, 0.18)",
  focus: "0 0 0 3px rgba(35, 108, 255, 0.35)"
};

export const typography = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px"
  },
  letterSpacings: {
    normal: "0",
    wide: "0.01em"
  }
};

export const tokens = {
  colors,
  spacing,
  radii,
  shadows,
  typography
};

export function themeStyles(mode: ThemeMode = "light") {
  return {
    "--signal-color-bg": colors[mode].background,
    "--signal-color-surface": colors[mode].surface,
    "--signal-color-muted": colors[mode].muted,
    "--signal-color-border": colors[mode].border,
    "--signal-color-text": colors[mode].text,
    "--signal-color-subtle": colors[mode].subtle,
    "--signal-color-accent": colors[mode].accent,
    "--signal-color-accent-strong": colors[mode].accentStrong,
    "--signal-color-success": colors[mode].success,
    "--signal-color-warning": colors[mode].warning,
    "--signal-color-danger": colors[mode].danger,
    "--signal-color-overlay": colors[mode].overlay,
    "--signal-font-sans": typography.fontFamily,
    "--signal-shadow-soft": shadows.soft,
    "--signal-shadow-strong": shadows.strong,
    "--signal-shadow-focus": shadows.focus,
    "--signal-radius-xs": radii.xs,
    "--signal-radius-sm": radii.sm,
    "--signal-radius-md": radii.md,
    "--signal-radius-lg": radii.lg,
    "--signal-radius-full": radii.full,
    "--signal-space-0": spacing[0],
    "--signal-space-1": spacing[1],
    "--signal-space-2": spacing[2],
    "--signal-space-3": spacing[3],
    "--signal-space-4": spacing[4],
    "--signal-space-5": spacing[5],
    "--signal-space-6": spacing[6],
    "--signal-space-8": spacing[8],
    "--signal-space-10": spacing[10],
    "--signal-space-12": spacing[12],
    "--signal-space-16": spacing[16],
    "--signal-space-20": spacing[20],
    "--signal-space-24": spacing[24]
  } as const;
}
