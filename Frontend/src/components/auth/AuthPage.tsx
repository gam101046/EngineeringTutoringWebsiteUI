"use client";


import { Button, Divider, Form, Input, Segmented, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ORANGE } from "@/lib/theme";

const { Title, Paragraph } = Typography;

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useApp();

  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";
  const redirect = searchParams.get("redirect") || "/";

  const [authTab, setAuthTab] = useState<"login" | "register">(initialTab);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    login();
    router.push(redirect);
  };

  return (
    <div
      className="auth-gradient"
      style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px" }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          padding: 32,
          width: "100%",
          maxWidth: 420,
        }}
      >
        <Segmented
          block
          value={authTab}
          onChange={(v) => setAuthTab(v as "login" | "register")}
          options={[
            { label: "เข้าสู่ระบบ", value: "login" },
            { label: "สมัครสมาชิก", value: "register" },
          ]}
          style={{ marginBottom: 24 }}
        />

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 4 }}>
            {authTab === "login" ? "ยินดีต้อนรับกลับ! 👋" : "เริ่มต้นกันเลย! 🚀"}
          </Title>
          <Paragraph type="secondary">
            {authTab === "login"
              ? "เข้าสู่ระบบเพื่อเข้าถึงคอร์สของคุณ"
              : "สมัครฟรี เริ่มเรียนได้ทันที"}
          </Paragraph>
        </div>

        <Button size="large" style={{ marginBottom: 16 , background: "#fff", borderColor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }} block>
          <img src="/google.svg" alt="Google" width={24} height={24} style={{ marginRight: 8 }} />
          {authTab === "login" ? "เข้าสู่ระบบด้วย Google" : "สมัครด้วย Google"}
        </Button>

        <Divider plain>หรือ</Divider>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {authTab === "register" && (
            <Form.Item label="ชื่อ-นามสกุล" name="name" rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}>
              <Input placeholder="เช่น นิว วิชัย" size="large" />
            </Form.Item>
          )}
          <Form.Item
            label="อีเมล"
            name="email"
            rules={[{ required: true, type: "email", message: "กรุณากรอกอีเมล" }]}
          >
            <Input placeholder="your@email.com" size="large" />
          </Form.Item>
          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[{ required: true, min: 8, message: "อย่างน้อย 8 ตัวอักษร" }]}
          >
            <Input.Password
              placeholder={authTab === "login" ? "รหัสผ่านของคุณ" : "อย่างน้อย 8 ตัวอักษร"}
              size="large"
            />
          </Form.Item>

          {authTab === "login" && (
            <div style={{ textAlign: "right", marginBottom: 16 }}>
              <Button type="link" style={{ padding: 0 }}>
                ลืมรหัสผ่าน?
              </Button>
            </div>
          )}

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{ background: ORANGE, borderColor: ORANGE }}
          >
            {authTab === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิกฟรี! 🎉"}
          </Button>
        </Form>
      </div>
    </div>
  );
}
