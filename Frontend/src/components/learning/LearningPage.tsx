"use client";

import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  MessageOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, List, Progress, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LESSONS } from "@/lib/data";
import type { Course, Lesson } from "@/lib/types";
import { MAROON, ORANGE } from "@/lib/theme";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

interface LearningPageProps {
  course: Course;
}

export default function LearningPage({ course }: LearningPageProps) {
  const router = useRouter();
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);

  return (
    <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
      <Header
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "0 16px",
          height: 56,
          lineHeight: "56px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/my-courses")}
        >
          กลับ
        </Button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text strong ellipsis style={{ display: "block" }}>
            {course.title}
          </Text>
          <Text type="secondary" ellipsis style={{ fontSize: 12 }}>
            {currentLesson.title}
          </Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12, flexShrink: 0 }}>
          {course.lessons} บทเรียน
        </Text>
      </Header>

      <Layout>
        <Content>
          <div
            style={{
              background: "#111",
              aspectRatio: "16/9",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <Button
              shape="circle"
              size="large"
              icon={<PlayCircleOutlined style={{ fontSize: 28, color: "#fff" }} />}
              style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)", width: 64, height: 64 }}
            />
            <Text style={{ color: "#fff" }}>{currentLesson.title}</Text>
            <Text style={{ color: "#999", fontSize: 12 }}>{currentLesson.duration}</Text>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#333" }}>
              <div style={{ width: "35%", height: "100%", background: ORANGE }} />
            </div>
          </div>

          <div style={{ padding: "16px 20px", background: "#fff", borderTop: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <Title level={5} style={{ margin: 0 }}>
                  {currentLesson.title}
                </Title>
                <Text type="secondary">{course.instructor}</Text>
              </div>
              <Space>
                <Button icon={<DownloadOutlined />}>เอกสาร</Button>
                <Button icon={<MessageOutlined />}>ถามคำถาม</Button>
              </Space>
            </div>
          </div>
        </Content>

        <Sider
          width={320}
          breakpoint="md"
          collapsedWidth={0}
          style={{ background: "#fff", borderLeft: "1px solid #f0f0f0" }}
        >
          <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <Text strong>รายการบทเรียน</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {course.progress || 35}%
              </Text>
            </div>
            <Progress percent={course.progress || 35} showInfo={false} strokeColor={MAROON} size="small" />
          </div>
          <List
            dataSource={LESSONS}
            renderItem={(lesson, i) => (
              <List.Item
                style={{
                  cursor: "pointer",
                  padding: "12px 16px",
                  background: currentLesson.id === lesson.id ? `${MAROON}08` : undefined,
                  borderLeft: currentLesson.id === lesson.id ? `3px solid ${MAROON}` : "3px solid transparent",
                }}
                onClick={() => setCurrentLesson(lesson)}
              >
                <List.Item.Meta
                  avatar={
                    lesson.done ? (
                      <CheckCircleOutlined style={{ color: "#16a34a" }} />
                    ) : currentLesson.id === lesson.id ? (
                      <PlayCircleOutlined style={{ color: MAROON }} />
                    ) : (
                      <span style={{ width: 20, textAlign: "center", color: "#999" }}>{i + 1}</span>
                    )
                  }
                  title={
                    <Text
                      style={{
                        fontSize: 13,
                        color: currentLesson.id === lesson.id ? MAROON : undefined,
                      }}
                    >
                      {lesson.title}
                    </Text>
                  }
                  description={
                    <Space size={8}>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {lesson.duration}
                      </Text>
                      {lesson.done && (
                        <Text type="success" style={{ fontSize: 11 }}>
                          ดูแล้ว
                        </Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Sider>
      </Layout>
    </Layout>
  );
}
