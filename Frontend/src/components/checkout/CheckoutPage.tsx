"use client";

import { ArrowRightOutlined, CheckOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Input, Radio, Result, Row, Space, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Course } from "@/lib/types";
import { ORANGE } from "@/lib/theme";

const { Title, Text } = Typography;

interface CheckoutPageProps {
  course: Course;
}

export default function CheckoutPage({ course }: CheckoutPageProps) {
  const router = useRouter();
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "promptpay">("card");

  const checkoutDiscount = course.originalPrice ? course.originalPrice - course.price : 0;

  if (checkoutDone) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <Result
          status="success"
          title="ชำระเงินสำเร็จ! 🎉"
          subTitle={
            <>
              <Text>{course.title}</Text>
              <br />
              <Text type="secondary">พร้อมให้เรียนแล้ว ดูย้อนหลังได้ตลอดชีพ</Text>
            </>
          }
          extra={
            <Button
              type="primary"
              size="large"
              style={{ background: ORANGE, borderColor: ORANGE }}
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={() => router.push("/my-courses")}
            >
              ไปดูคอร์สของฉัน
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Title level={2} style={{ marginBottom: 24 }}>
        สรุปการสั่งซื้อ
      </Title>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <Card title="รายการสั่งซื้อ" style={{ marginBottom: 16 }}>
            <Space align="start" style={{ marginBottom: 16 }}>
              <Image
                src={course.image}
                alt={course.title}
                width={80}
                height={56}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <div>
                <Text strong style={{ display: "block" }}>
                  {course.title}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {course.instructor}
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {course.lessons} บทเรียน · ดูได้ตลอดชีพ
                </Text>
              </div>
            </Space>
            <Divider />
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary">ราคาปกติ</Text>
                <Text>฿{(course.originalPrice || course.price).toLocaleString()}</Text>
              </div>
              {checkoutDiscount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text type="secondary">ส่วนลด</Text>
                  <Text type="success">-฿{checkoutDiscount.toLocaleString()}</Text>
                </div>
              )}
              <Divider style={{ margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>รวมทั้งสิ้น</Text>
                <Text strong style={{ fontSize: 16 }}>
                  ฿{course.price.toLocaleString()}
                </Text>
              </div>
            </Space>
          </Card>
          <Space>
            <SafetyCertificateOutlined style={{ color: "#16a34a" }} />
            <Text type="secondary" style={{ fontSize: 12 }}>
              ชำระเงินปลอดภัย
            </Text>
            <CheckOutlined style={{ color: "#16a34a" }} />
            <Text type="secondary" style={{ fontSize: 12 }}>
              คืนเงินได้ใน 7 วัน
            </Text>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <Title level={5} style={{ marginBottom: 16 }}>
            เลือกช่องทางชำระเงิน
          </Title>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ width: "100%", marginBottom: 20 }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              <Radio value="card" style={{ width: "100%", padding: 16, border: "1px solid #f0f0f0", borderRadius: 12 }}>
                💳 บัตรเครดิต / เดบิต
              </Radio>
              <Radio value="promptpay" style={{ width: "100%", padding: 16, border: "1px solid #f0f0f0", borderRadius: 12 }}>
                📱 พร้อมเพย์ (QR Code)
              </Radio>
            </Space>
          </Radio.Group>

          {paymentMethod === "card" && (
            <Space direction="vertical" style={{ width: "100%", marginBottom: 20 }}>
              <Input placeholder="1234 5678 9012 3456" size="large" />
              <Row gutter={12}>
                <Col span={12}>
                  <Input placeholder="MM / YY" size="large" />
                </Col>
                <Col span={12}>
                  <Input placeholder="CVV" size="large" />
                </Col>
              </Row>
              <Input placeholder="ชื่อบนบัตร" size="large" />
            </Space>
          )}

          {paymentMethod === "promptpay" && (
            <Card style={{ textAlign: "center", background: "#f5f5f5", marginBottom: 20 }}>
              <div
                style={{
                  width: 112,
                  height: 112,
                  background: "#fff",
                  border: "2px solid #f0f0f0",
                  borderRadius: 12,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                }}
              >
                📱
              </div>
              <Text strong style={{ display: "block" }}>
                สแกน QR Code ด้วยแอปธนาคาร
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                หรือโอนมาที่เบอร์ 099-999-9999
              </Text>
            </Card>
          )}

          <Button
            type="primary"
            block
            size="large"
            style={{ background: ORANGE, borderColor: ORANGE }}
            onClick={() => setCheckoutDone(true)}
          >
            ยืนยันการชำระเงิน ฿{course.price.toLocaleString()}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
