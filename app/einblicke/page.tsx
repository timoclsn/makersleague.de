import { PageLayout } from "@/components/layouts/PageLayout";
import { Blog } from "components/Blog";
import { InstagramSection } from "components/InstagramSection";
import { PageContent } from "components/layouts/PageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Einblicke",
  description:
    "Einblicke in die Makers League. Hier findest du unseren Blog und Instagram Bilder.",
};

const InsightsPage = () => {
  return (
    <PageLayout>
      <PageContent>
        <div>
          <h1 className="mb-16 text-xl font-bold md:text-5xl">Einblicke</h1>
          <InstagramSection count={9} />
        </div>
        <Blog />
      </PageContent>
    </PageLayout>
  );
};

export default InsightsPage;
