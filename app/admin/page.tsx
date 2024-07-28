import { WelcomeEmailCard } from "@/components/admin/WelcomeEmailCard/WelcomeEmailCard";
import { Toaster } from "@/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Makers League Admin Page",
  robots: {
    index: false,
  },
};

const AdminPage = () => {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-bold">Admin</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <WelcomeEmailCard />
      </section>
      <Toaster />
    </div>
  );
};

export default AdminPage;
