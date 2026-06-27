import type { ThemeConfig } from "antd";

export const MAROON = "#7A1F2B";
export const MAROON_DARK = "#5C141E";
export const ORANGE = "#F2994A";
export const ORANGE_DARK = "#e08030";

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: MAROON,
    colorLink: MAROON,
    colorSuccess: "#16a34a",
    colorWarning: ORANGE,
    borderRadius: 8,
    fontFamily: "'Noto Sans Thai', 'Inter', sans-serif",
  },
  components: {
    Button: {
      primaryShadow: "none",
    },
    Layout: {
      headerBg: "#ffffff",
      bodyBg: "#fafafa",
    },
  },
};
