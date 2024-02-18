import { Page } from "components/Page";
import { getPage } from "lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Makers League Datenschutzerklärung",
};

const PrivacyPage = async () => {
  const { data, content } = await getPage("datenschutzerklaerung");

  return (
    <Page>
      <section className="prose mb-8">
        <h1>{data.title}</h1>
        {content}
      </section>
    </Page>
  );
};

export default PrivacyPage;
