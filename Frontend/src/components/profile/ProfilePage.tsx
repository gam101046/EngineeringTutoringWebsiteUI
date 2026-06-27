"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Space, Statistic, Tag, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { getCompletedCourses, getMyCourses } from "@/lib/data";
import { MAROON } from "@/lib/theme";

const { Title, Text } = Typography;

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useApp();

  const myCourses = getMyCourses();
  const completedCourses = getCompletedCourses();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="page-container" style={{ maxWidth: 768 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        โปรไฟล์ของฉัน
      </Title>

      <Card style={{ marginBottom: 16 }}>
        <Space align="start" style={{ width: "100%", marginBottom: 24 }} size="middle">
          <Avatar size={64} style={{ backgroundColor: MAROON, fontSize: 24 }}>
            น
          </Avatar>
          <div style={{ flex: 1 }}>
            <Title level={4} style={{ margin: 0 }}>
              นิว วิชัยพงศ์
            </Title>
            <Text type="secondary">niw@university.ac.th</Text>
            <br />
            <Tag color={MAROON} style={{ marginTop: 8 }}>
              นักเรียน
            </Tag>
          </div>
          <Button>แก้ไขข้อมูล</Button>
        </Space>

        <Row gutter={12}>
          <Col span={8}>
            <Statistic title="คอร์สทั้งหมด" value={myCourses.length} />
          </Col>
          <Col span={8}>
            <Statistic title="เรียนจบแล้ว" value={completedCourses.length} />
          </Col>
          <Col span={8}>
            <Statistic title="ชั่วโมงเรียน" value="24h" />
          </Col>
        </Row>
      </Card>

      <Card title="ประวัติการสั่งซื้อ" style={{ marginBottom: 16 }}>
        {myCourses.map((course) => (
          <div
            key={course.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Image
              src={course.image}
              alt={course.title}
              width={48}
              height={36}
              style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text strong ellipsis style={{ display: "block" }}>
                {course.title}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                ชำระแล้ว 15 ม.ค. 2567
              </Text>
            </div>
            <Text strong>฿{course.price.toLocaleString()}</Text>
          </div>
        ))}
      </Card>

      <Button
        danger
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ borderColor: "#fca5a5" }}
      >
        ออกจากระบบ
      </Button>
    </div>
  );
}
