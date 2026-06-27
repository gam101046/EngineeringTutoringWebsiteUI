"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Input, Row, Space, Tag, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import CourseCard from "@/components/courses/CourseCard";
import { CATEGORIES, COURSES } from "@/lib/data";
import { MAROON } from "@/lib/theme";

const { Title, Text } = Typography;

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  const filteredCourses = useMemo(() => {
    return COURSES.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q || c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q);
      const matchCat = !selectedCategory || c.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="page-container">
      <Title level={2} style={{ marginBottom: 4 }}>
        คอร์สทั้งหมด
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
        {filteredCourses.length} คอร์ส พร้อมให้เรียน
      </Text>

      <Input
        size="large"
        placeholder="ค้นหาคอร์ส เช่น Calculus, Circuit, Python..."
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Space wrap style={{ marginBottom: 32 }}>
        <Tag.CheckableTag
          checked={!selectedCategory}
          onChange={() => setSelectedCategory(null)}
          style={{
            padding: "4px 16px",
            borderRadius: 20,
            ...( !selectedCategory ? { background: MAROON, color: "#fff" } : {}),
          }}
        >
          ทั้งหมด
        </Tag.CheckableTag>
        {CATEGORIES.map((cat) => (
          <Tag.CheckableTag
            key={cat.name}
            checked={selectedCategory === cat.name}
            onChange={() =>
              setSelectedCategory(selectedCategory === cat.name ? null : cat.name)
            }
            style={{
              padding: "4px 16px",
              borderRadius: 20,
              ...(selectedCategory === cat.name ? { background: MAROON, color: "#fff" } : {}),
            }}
          >
            {cat.name}
          </Tag.CheckableTag>
        ))}
      </Space>

      {filteredCourses.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredCourses.map((course) => (
            <Col xs={24} sm={12} lg={8} key={course.id}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description={
            <div>
              <Title level={4}>ไม่พบคอร์สที่ค้นหา</Title>
              <Text type="secondary">ลองค้นหาด้วยคำอื่น หรือดูคอร์สทั้งหมด</Text>
            </div>
          }
          style={{ padding: "80px 0" }}
        >
          <Button
            type="primary"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
            }}
          >
            ดูคอร์สทั้งหมด
          </Button>
        </Empty>
      )}
    </div>
  );
}
