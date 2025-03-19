import { PageLayout } from "@/components/layouts/PageLayout";
import { PageContent } from "components/layouts/PageContent";
import { getPage } from "lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Makers League Datenschutzerklärung",
};

const PrivacyPage = async () => {
  const { data, content } = await getPage("datenschutzerklaerung");

  return (
    <PageLayout>
      <PageContent>
        <section className="prose mb-8">
          <h1>{data.title}</h1>
          {content}
        </section>
      </PageContent>
    </PageLayout>
  );
};

export default PrivacyPage;
