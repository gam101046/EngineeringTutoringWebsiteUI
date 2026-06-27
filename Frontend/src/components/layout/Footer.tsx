"use client";

import { BookOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAROON } from "@/lib/theme";

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

const footerCategories = [
  "Calculus",
  "Circuit Analysis",
  "Thermodynamics",
  "Programming",
  "Mechanics",
];

const footerLinks = [
  "เกี่ยวกับเรา",
  "นโยบายความเป็นส่วนตัว",
  "เงื่อนไขการใช้งาน",
  "ติดต่อเรา",
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/learning")) return null;

  return (
    <AntFooter style={{ background: "#1A1A1A", color: "#fff", padding: "48px 16px 0", marginTop: 80 }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: MAROON,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BookOutlined style={{ color: "#fff" }} />
              </div>
              <Title level={4} style={{ color: "#fff", margin: 0 }}>
                Engenius
              </Title>
            </div>
            <Text style={{ color: "#9ca3af" }}>
              แพลตฟอร์มติวออนไลน์สำหรับวิศวกรรม
              <br />
              โดยรุ่นพี่ที่ผ่านมาแล้ว เพื่อน้องที่กำลังสู้อยู่
            </Text>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: "#fff", marginBottom: 16 }}>
              หมวดวิชา
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {footerCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/catalog?category=${cat.split(" ")[0]}`}
                  style={{ color: "#9ca3af" }}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: "#fff", marginBottom: 16 }}>
              ข้อมูลทั่วไป
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {footerLinks.map((item) => (
                <Text key={item} style={{ color: "#9ca3af", cursor: "pointer" }}>
                  {item}
                </Text>
              ))}
            </div>
          </Col>
        </Row>
        <div
          style={{
            borderTop: "1px solid #374151",
            marginTop: 32,
            padding: "16px 0",
            textAlign: "center",
          }}
        >
          <Text style={{ color: "#6b7280", fontSize: 12 }}>
            © 2026 Engenius · ทำด้วย ❤️ สำหรับน้องๆ วิศวะทุกคน
          </Text>
        </div>
      </div>
    </AntFooter>
  );
}
