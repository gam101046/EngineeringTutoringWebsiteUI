"use client";

import { ConfigProvider } from "antd";
import thTH from "antd/locale/th_TH";
import { AppProvider } from "@/context/AppContext";
import { antdTheme } from "@/lib/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme} locale={thTH}>
      <AppProvider>{children}</AppProvider>
    </ConfigProvider>
  );
}
