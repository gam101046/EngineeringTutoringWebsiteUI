"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Progress, Row, Segmented, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getActiveCourses, getCompletedCourses } from "@/lib/data";
import { MAROON, ORANGE } from "@/lib/theme";

const { Title, Text } = Typography;

export default function MyCoursesPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"active" | "completed">("active");

  const activeCourses = getActiveCourses();
  const completedCourses = getCompletedCourses();
  const displayedCourses = tab === "active" ? activeCourses : completedCourses;

  return (
    <div className="page-container" style={{ maxWidth: 960 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        คอร์สของฉัน
      </Title>

      <Segmented
        value={tab}
        onChange={(v) => setTab(v as "active" | "completed")}
        options={[
          { label: `กำลังเรียน (${activeCourses.length})`, value: "active" },
          { label: `จบแล้ว (${completedCourses.length})`, value: "completed" },
        ]}
        style={{ marginBottom: 24 }}
      />

      {displayedCourses.length > 0 ? (
        <Row gutter={[16, 16]}>
          {displayedCourses.map((course) => (
            <Col xs={24} md={12} key={course.id}>
              <Card>
                <div style={{ display: "flex", gap: 16 }}>
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={96}
                    height={80}
                    style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {course.category}
                    </Text>
                    <Title level={5} ellipsis={{ rows: 2 }} style={{ margin: "4px 0 8px" }}>
                      {course.title}
                    </Title>
                    {course.progress !== undefined && (
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            เรียนไปแล้ว
                          </Text>
                          <Text strong style={{ fontSize: 12 }}>
                            {course.progress}%
                          </Text>
                        </div>
                        <Progress percent={course.progress} showInfo={false} strokeColor={MAROON} size="small" />
                      </div>
                    )}
                    <Button
                      type="primary"
                      size="small"
                      style={{
                        background: course.completed ? "#16a34a" : ORANGE,
                        borderColor: course.completed ? "#16a34a" : ORANGE,
                      }}
                      icon={<ArrowRightOutlined />}
                      iconPosition="end"
                      onClick={() => router.push(`/learning/${course.id}`)}
                    >
                      {course.completed ? "ดูอีกครั้ง" : "เข้าเรียนต่อ"}
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <Title level={4}>
                {tab === "active" ? "ยังไม่มีคอร์สที่กำลังเรียน" : "ยังไม่มีคอร์สที่เรียนจบ"}
              </Title>
              <Text type="secondary">ไปหาคอร์สที่ชอบแล้วเริ่มเรียนกันเลย!</Text>
            </div>
          }
          style={{ padding: "80px 0" }}
        >
          <Link href="/catalog">
            <Button type="primary" style={{ background: ORANGE, borderColor: ORANGE }}>
              ดูคอร์สทั้งหมด
            </Button>
          </Link>
        </Empty>
      )}
    </div>
  );
}
