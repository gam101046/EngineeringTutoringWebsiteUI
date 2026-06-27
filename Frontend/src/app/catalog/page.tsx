import { Suspense } from "react";
import CatalogPage from "@/components/catalog/CatalogPage";
import MainLayout from "@/components/layout/MainLayout";

export default function Catalog() {
  return (
    <MainLayout>
      <Suspense>
        <CatalogPage />
      </Suspense>
    </MainLayout>
  );
}
