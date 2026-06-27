"use client";

import {
  ArrowLeftOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  LockOutlined,
  PlayCircleOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Rate,
  Row,
  Space,
  Tabs,
  Tag,
  Typography,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { getDiscountPercent, LESSONS, TESTIMONIALS } from "@/lib/data";
import type { Course } from "@/lib/types";
import { MAROON, ORANGE } from "@/lib/theme";

const { Title, Text, Paragraph } = Typography;

interface CourseDetailPageProps {
  course: Course;
}

export default function CourseDetailPage({ course }: CourseDetailPageProps) {
  const router = useRouter();
  const { isLoggedIn } = useApp();
  const discountPct = getDiscountPercent(course);

  const buyCourse = () => {
    if (!isLoggedIn) {
      router.push(`/auth?tab=login&redirect=/checkout/${course.id}`);
    } else {
      router.push(`/checkout/${course.id}`);
    }
  };

  const learnCourse = () => {
    router.push(`/learning/${course.id}`);
  };

  const tabItems = [
    {
      key: "content",
      label: "เนื้อหาคอร์ส",
      children: (
        <div>
          <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
            รวม {course.lessons} บทเรียน · {course.hours} ชั่วโมง
          </Text>
          <List
            dataSource={LESSONS}
            renderItem={(lesson) => (
              <List.Item
                style={{ cursor: "pointer", borderRadius: 8, padding: "12px 8px" }}
                onClick={() => {
                  if (lesson.free || course.progress !== undefined) learnCourse();
                }}
              >
                <List.Item.Meta
                  avatar={
                    lesson.done ? (
                      <CheckCircleOutlined style={{ color: "#16a34a", fontSize: 18 }} />
                    ) : lesson.free ? (
                      <PlayCircleOutlined style={{ color: MAROON, fontSize: 18 }} />
                    ) : (
                      <LockOutlined style={{ color: "#999", fontSize: 16 }} />
                    )
                  }
                  title={lesson.title}
                  description={lesson.free ? <Text type="success">ดูฟรี</Text> : undefined}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {lesson.duration}
                </Text>
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: "instructor",
      label: "ผู้สอน",
      children: (
        <Space align="start" size="middle">
          <Avatar size={64} style={{ backgroundColor: MAROON }}>
            {course.instructor.charAt(2)}
          </Avatar>
          <div>
            <Title level={4} style={{ marginTop: 0 }}>
              {course.instructor}
            </Title>
            <Text type="secondary">
              ผู้เชี่ยวชาญวิชา {course.category} · ประสบการณ์ 5+ ปี
            </Text>
            <Paragraph style={{ marginTop: 12 }}>
              ผ่านการเรียนวิศวกรรมมาโดยตรง เข้าใจจุดที่น้องๆ มักติดขัด อธิบายด้วยตัวอย่างจากชีวิตจริงและโจทย์สอบจริง
              ช่วยน้องให้ผ่านวิชาหนักๆ มาแล้วกว่า 2,000 คน ตอบ comment ทุกข้อภายใน 24 ชั่วโมง
            </Paragraph>
          </div>
        </Space>
      ),
    },
    {
      key: "reviews",
      label: "รีวิว",
      children: (
        <List
          dataSource={TESTIMONIALS}
          renderItem={(t) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: MAROON }}>{t.initial}</Avatar>}
                title={
                  <Space>
                    <Text strong>{t.name}</Text>
                    <Rate disabled defaultValue={5} style={{ fontSize: 12 }} />
                  </Space>
                }
                description={t.major}
              />
              <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{t.text}</Paragraph>
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <div className="page-container">
      <Link href="/catalog" style={{ color: "#666", marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 4 }}>
        <ArrowLeftOutlined /> กลับไปดูคอร์สทั้งหมด
      </Link>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={16}>
          <Tag color={MAROON} style={{ marginBottom: 12 }}>
            {course.category}
          </Tag>
          <Title level={2}>{course.title}</Title>
          <Paragraph type="secondary">{course.description}</Paragraph>

          <Space wrap size="large" style={{ marginBottom: 24 }}>
            <Space size={4}>
              <Rate disabled defaultValue={course.rating} allowHalf style={{ fontSize: 14 }} />
              <Text strong>{course.rating}</Text>
              <Text type="secondary">({course.reviewCount} รีวิว)</Text>
            </Space>
            <Space>
              <TeamOutlined />
              <Text type="secondary">{course.students.toLocaleString()} นักเรียน</Text>
            </Space>
            <Space>
              <ClockCircleOutlined />
              <Text type="secondary">{course.hours} ชั่วโมง</Text>
            </Space>
            <Space>
              <BookOutlined />
              <Text type="secondary">{course.lessons} บทเรียน</Text>
            </Space>
          </Space>

          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
            <Image
              src={course.image}
              alt={course.title}
              width={800}
              height={256}
              style={{ width: "100%", height: 256, objectFit: "cover", opacity: 0.85 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <Button
                type="default"
                shape="circle"
                size="large"
                icon={<PlayCircleOutlined style={{ fontSize: 24, color: MAROON }} />}
              />
            </div>
            <Tag
              style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none" }}
            >
              ตัวอย่างฟรี: บทที่ 1
            </Tag>
          </div>

          <Tabs items={tabItems} />
        </Col>

        <Col xs={24} md={8}>
          <Card style={{ position: "sticky", top: 80 }} styles={{ body: { padding: 20 } }}>
            <Space align="end" style={{ marginBottom: 16 }}>
              <Title level={2} style={{ margin: 0 }}>
                ฿{course.price.toLocaleString()}
              </Title>
              {course.originalPrice && (
                <Text delete type="secondary">
                  ฿{course.originalPrice.toLocaleString()}
                </Text>
              )}
            </Space>
            {discountPct > 0 && (
              <Tag color={ORANGE} style={{ marginBottom: 16 }}>
                ลด {discountPct}% — ราคาพิเศษ!
              </Tag>
            )}

            <Button
              type="primary"
              block
              size="large"
              style={{ background: ORANGE, borderColor: ORANGE, marginBottom: 12 }}
              onClick={buyCourse}
            >
              ซื้อคอร์สนี้!
            </Button>
            <Button block size="large" style={{ borderColor: MAROON, color: MAROON, marginBottom: 20 }} onClick={learnCourse}>
              ลองดูตัวอย่างฟรี
            </Button>

            <Divider style={{ margin: "16px 0" }} />

            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Space>
                <Text strong style={{ color: MAROON, fontSize: 18 }}>
                  ∞
                </Text>
                <Text>ดูซ้ำได้ตลอดชีพ</Text>
              </Space>
              <Space>
                <BookOutlined style={{ color: MAROON }} />
                <Text>
                  {course.lessons} บทเรียน · {course.hours} ชั่วโมง
                </Text>
              </Space>
              <Space>
                <DownloadOutlined style={{ color: MAROON }} />
                <Text>เอกสารประกอบดาวน์โหลดได้</Text>
              </Space>
              <Space>
                <TrophyOutlined style={{ color: MAROON }} />
                <Text>ใบเซอร์เมื่อเรียนจบ</Text>
              </Space>
              <Space>
                <SafetyCertificateOutlined style={{ color: "#16a34a" }} />
                <Text>ชำระเงินปลอดภัย 100%</Text>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
