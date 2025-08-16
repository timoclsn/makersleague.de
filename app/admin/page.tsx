import { EmailCard } from "@/components/admin/EmailCard/EmailCard";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Toaster } from "@/ui/toaster";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "Makers League Admin Page",
  robots: {
    index: false,
  },
};

const AdminPage = () => {
  return (
    <PageLayout>
      <h1 className="mb-10 text-4xl font-bold">Admin</h1>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <EmailCard />
      </section>
      <Toaster />
    </PageLayout>
  );
};

export default AdminPage;
