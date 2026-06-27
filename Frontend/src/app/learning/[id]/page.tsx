import { notFound } from "next/navigation";
import LearningPage from "@/components/learning/LearningPage";
import { getCourseById } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Learning({ params }: Props) {
  const { id } = await params;
  const course = getCourseById(Number(id));

  if (!course) notFound();

  return <LearningPage course={course} />;
}
