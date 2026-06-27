"use client";

import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Progress, Rate, Space, Tag, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Course } from "@/lib/types";
import { getBadgeColor, getDiscountPercent } from "@/lib/data";
import { MAROON } from "@/lib/theme";

const { Text, Title } = Typography;

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

export default function CourseCard({ course, showProgress = false }: CourseCardProps) {
  const router = useRouter();

  const badgeLabel =
    course.badge === "ลด" && course.originalPrice
      ? `ลด ${getDiscountPercent(course)}%`
      : course.badge;

  return (
    <Card
      hoverable
      cover={
        <div style={{ position: "relative", height: 176, overflow: "hidden" }}>
          <Image
            src={course.image}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 300px"
          />
          {course.badge && (
            <Tag
              color={getBadgeColor(course.badge)}
              style={{ position: "absolute", top: 10, left: 10, margin: 0, fontWeight: 700 }}
            >
              {badgeLabel}
            </Tag>
          )}
        </div>
      }
      onClick={() => router.push(`/courses/${course.id}`)}
      styles={{ body: { padding: 16 } }}
    >
      <Text type="secondary" style={{ fontSize: 12 }}>
        {course.category}
      </Text>
      <Title level={5} style={{ margin: "4px 0 8px", lineHeight: 1.4 }} ellipsis={{ rows: 2 }}>
        {course.title}
      </Title>
      <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
        {course.instructor}
      </Text>
      <Space size={4} style={{ marginBottom: 12 }}>
        <Rate disabled defaultValue={course.rating} allowHalf style={{ fontSize: 12 }} />
        <Text strong style={{ fontSize: 12 }}>
          {course.rating}
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          ({course.reviewCount})
        </Text>
      </Space>

      {showProgress && course.progress !== undefined ? (
        <div>
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
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Space size={4}>
            <Text strong>฿{course.price.toLocaleString()}</Text>
            {course.originalPrice && (
              <Text delete type="secondary" style={{ fontSize: 12 }}>
                ฿{course.originalPrice.toLocaleString()}
              </Text>
            )}
          </Space>
          <Space size={4}>
            <ClockCircleOutlined style={{ fontSize: 10, color: "#999" }} />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {course.hours}ชม.
            </Text>
          </Space>
        </div>
      )}
    </Card>
  );
}
