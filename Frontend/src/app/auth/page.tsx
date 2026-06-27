import { Suspense } from "react";
import AuthPage from "@/components/auth/AuthPage";
import MainLayout from "@/components/layout/MainLayout";

export default function Auth() {
  return (
    <MainLayout>
      <Suspense>
        <AuthPage />
      </Suspense>
    </MainLayout>
  );
}
