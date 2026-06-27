import { notFound } from "next/navigation";
import CheckoutPage from "@/components/checkout/CheckoutPage";
import MainLayout from "@/components/layout/MainLayout";
import { getCourseById } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Checkout({ params }: Props) {
  const { id } = await params;
  const course = getCourseById(Number(id));

  if (!course) notFound();

  return (
    <MainLayout>
      <CheckoutPage course={course} />
    </MainLayout>
  );
}
