import { PageLayout } from "@/components/layouts/PageLayout";
import { PageContent } from "components/layouts/PageContent";
import { getPage } from "lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Makers League Impressum",
};

const ImprintPage = async () => {
  const { data, content } = await getPage("impressum");
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

export default ImprintPage;
