"use client";

import { Layout } from "antd";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const { Content } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
}
