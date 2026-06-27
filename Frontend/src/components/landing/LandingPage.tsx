"use client";

import {
  ArrowRightOutlined,
  BookOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Rate, Row, Space, Tag, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import CourseCard from "@/components/courses/CourseCard";
import { CATEGORIES, COURSES, TESTIMONIALS } from "@/lib/data";
import { MAROON, ORANGE } from "@/lib/theme";

const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  return (
    <div>
      <section className="hero-gradient" style={{ padding: "64px 16px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <Tag color={MAROON} style={{ marginBottom: 20, padding: "4px 12px" }}>
                🎓 ติวโดยรุ่นพี่วิศวะจริงๆ
              </Tag>
              <Title style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.2, marginBottom: 20 }}>
                วิชาวิศวะ
                <br />
                <span style={{ color: MAROON }}>ยากแค่ไหน</span>
                <br />
                ก็ผ่านได้!
              </Title>
              <Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 32, maxWidth: 420 }}>
                คอร์สติวออนไลน์โดยรุ่นพี่ที่ผ่านมาแล้ว อธิบายแบบเพื่อนช่วยติว เข้าใจง่าย ดูย้อนหลังได้ตลอดชีพ
              </Paragraph>
              <Space wrap style={{ marginBottom: 32 }}>
                <Link href="/catalog">
                  <Button
                    type="primary"
                    size="large"
                    style={{ background: ORANGE, borderColor: ORANGE }}
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                  >
                    ดูคอร์สทั้งหมด
                  </Button>
                </Link>
                <Link href={`/courses/${COURSES[0].id}`}>
                  <Button size="large" style={{ borderColor: MAROON, color: MAROON }}>
                    ดูตัวอย่างฟรี
                  </Button>
                </Link>
              </Space>
              <Space wrap size="large">
                <Space>
                  <TeamOutlined style={{ color: MAROON }} />
                  <Text>
                    <Text strong>12,000+</Text> นักเรียน
                  </Text>
                </Space>
                <Space>
                  <BookOutlined style={{ color: MAROON }} />
                  <Text>
                    <Text strong>50+</Text> คอร์ส
                  </Text>
                </Space>
                <Space>
                  <Rate disabled defaultValue={4.8} style={{ fontSize: 14 }} />
                  <Text>
                    <Text strong>4.8</Text> คะแนนเฉลี่ย
                  </Text>
                </Space>
              </Space>
            </Col>
            <Col xs={0} md={12}>
              <div style={{ position: "relative" }}>
                <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=640&h=430&fit=crop&auto=format"
                    alt="นักเรียนเรียนออนไลน์"
                    width={640}
                    height={320}
                    style={{ width: "100%", height: 320, objectFit: "cover" }}
                  />
                </div>
                <Card
                  size="small"
                  style={{ position: "absolute", bottom: -20, left: -20, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                >
                  <Space>
                    <CheckCircleOutlined style={{ color: "#16a34a", fontSize: 20 }} />
                    <div>
                      <Text strong style={{ fontSize: 12, display: "block" }}>
                        ผ่านสอบได้ A! 🎉
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        นิว วิศวะเครื่องกล
                      </Text>
                    </div>
                  </Space>
                </Card>
                <Card
                  size="small"
                  style={{ position: "absolute", top: -16, right: -16, textAlign: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                >
                  <Rate disabled defaultValue={5} style={{ fontSize: 10 }} />
                  <div>
                    <Text strong style={{ fontSize: 12 }}>4.9 / 5.0</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    342 รีวิว
                  </Text>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section style={{ padding: "48px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <Title level={3} style={{ marginBottom: 24 }}>
            เลือกตามวิชาที่ต้องการ
          </Title>
          <Row gutter={[12, 12]}>
            {CATEGORIES.map((cat) => (
              <Col xs={12} sm={8} md={4} key={cat.name}>
                <Link href={`/catalog?category=${cat.name}`}>
                  <Card hoverable style={{ textAlign: "center" }} styles={{ body: { padding: 16 } }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.symbol}</div>
                    <Text strong style={{ display: "block" }}>
                      {cat.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {cat.count} คอร์ส
                    </Text>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section style={{ padding: "48px 16px", background: "#fafafa" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <Title level={3} style={{ margin: 0 }}>
              คอร์สแนะนำ 🔥
            </Title>
            <Link href="/catalog" style={{ color: MAROON }}>
              ดูทั้งหมด <ArrowRightOutlined />
            </Link>
          </div>
          <Row gutter={[16, 16]}>
            {COURSES.slice(0, 4).map((course) => (
              <Col xs={24} sm={12} lg={6} key={course.id}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section style={{ padding: "48px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <Title level={3}>น้องๆ พูดว่าอะไร 💬</Title>
          <Paragraph type="secondary" style={{ marginBottom: 32 }}>
            จากนักเรียนจริงๆ ที่ผ่านมาแล้ว
          </Paragraph>
          <Row gutter={[20, 20]}>
            {TESTIMONIALS.map((t, i) => (
              <Col xs={24} md={8} key={i}>
                <Card style={{ background: "#fafafa", height: "100%" }}>
                  <Rate disabled defaultValue={5} style={{ fontSize: 13, marginBottom: 12 }} />
                  <Paragraph>&ldquo;{t.text}&rdquo;</Paragraph>
                  <Space>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: MAROON,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <Text strong style={{ display: "block" }}>
                        {t.name}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {t.major}
                      </Text>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section style={{ padding: "64px 16px", background: MAROON, textAlign: "center" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <Title level={2} style={{ color: "#fff", marginBottom: 12 }}>
            พร้อมสู้กับวิชายากๆ แล้วหรือยัง?
          </Title>
          <Paragraph style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, fontSize: 16 }}>
            เริ่มเรียนวันนี้ ดูย้อนหลังได้ตลอด ไม่มีหมดอายุ ราคาที่น้องๆ จับต้องได้
          </Paragraph>
          <Link href="/catalog">
            <Button
              type="primary"
              size="large"
              style={{ background: ORANGE, borderColor: ORANGE }}
              icon={<ArrowRightOutlined />}
              iconPosition="end"
            >
              เริ่มเรียนเลย!
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
