import { notFound } from "next/navigation";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import MainLayout from "@/components/layout/MainLayout";
import { getCourseById } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: Props) {
  const { id } = await params;
  const course = getCourseById(Number(id));

  if (!course) notFound();

  return (
    <MainLayout>
      <CourseDetailPage course={course} />
    </MainLayout>
  );
}
