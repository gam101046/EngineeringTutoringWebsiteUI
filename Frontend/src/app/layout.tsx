import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engenius - ติวออนไลน์สำหรับวิศวกรรม",
  description: "แพลตฟอร์มติวออนไลน์สำหรับวิศวกรรม โดยรุ่นพี่ที่ผ่านมาแล้ว",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
