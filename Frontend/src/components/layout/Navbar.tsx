"use client";

import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Drawer, Layout, Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MAROON, ORANGE } from "@/lib/theme";

const { Header } = Layout;
const { Text } = Typography;

const navLinks = [
  { href: "/catalog", label: "คอร์สทั้งหมด" },
  { href: "/my-courses", label: "คอร์สของฉัน", requireAuth: true },
];

export default function Navbar() {
  const { isLoggedIn } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isLearning = pathname.startsWith("/learning");

  if (isLearning) return null;

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "0 16px",
          height: 64,
          lineHeight: "64px",
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/logo.png" alt="Engenius Logo" width={32} height={32} />
            <Text strong style={{ fontSize: 18, color: MAROON }}>
              Engenius
            </Text>
          </Link>

          <Space size="large" className="desktop-nav" style={{ display: "none" }}>
            {navLinks
              .filter((link) => !link.requireAuth || isLoggedIn)
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: pathname === link.href ? MAROON : "#1a1a1a",
                    fontWeight: pathname === link.href ? 600 : 400,
                  }}
                >
                  {link.label}
                </Link>
              ))}
          </Space>

          <Space className="desktop-nav" style={{ display: "none" }}>
            {isLoggedIn ? (
              <>
                <Badge dot color={ORANGE}>
                  <Button type="text" icon={<BellOutlined />} />
                </Badge>
                <Link href="/profile">
                  <Avatar style={{ backgroundColor: MAROON }}>น</Avatar>
                </Link>
              </>
            ) : (
              <>
                <Button type="text" onClick={() => router.push("/auth?tab=login")}>
                  เข้าสู่ระบบ
                </Button>
                <Button
                  type="primary"
                  style={{ background: ORANGE, borderColor: ORANGE }}
                  onClick={() => router.push("/auth?tab=register")}
                >
                  สมัครสมาชิก
                </Button>
              </>
            )}
          </Space>

          <Button
            type="text"
            icon={<MenuOutlined />}
            className="mobile-menu-btn"
            onClick={() => setDrawerOpen(true)}
          />
        </div>
      </Header>

      <Drawer
        title="เมนู"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          {navLinks
            .filter((link) => !link.requireAuth || isLoggedIn)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                style={{ display: "block", padding: "8px 0" }}
              >
                {link.label}
              </Link>
            ))}
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
            {isLoggedIn ? (
              <Button block onClick={() => { setDrawerOpen(false); router.push("/profile"); }}>
                โปรไฟล์
              </Button>
            ) : (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button block onClick={() => { setDrawerOpen(false); router.push("/auth?tab=login"); }}>
                  เข้าสู่ระบบ
                </Button>
                <Button
                  block
                  type="primary"
                  style={{ background: ORANGE, borderColor: ORANGE }}
                  onClick={() => { setDrawerOpen(false); router.push("/auth?tab=register"); }}
                >
                  สมัครสมาชิก
                </Button>
              </Space>
            )}
          </div>
        </Space>
      </Drawer>

      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
