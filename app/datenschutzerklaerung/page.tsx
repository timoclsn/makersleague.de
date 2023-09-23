import { allContentPages } from "contentlayer/generated";
import { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Makers League Datenschutzerklärung",
};

const PrivacyPage = () => {
  const content = allContentPages.find(
    (page) => page.title === "Datenschutzerklärung",
  );

  if (!content) {
    notFound();
  }

  const Component = useMDXComponent(content.body.code);
  return (
    <section className="prose mb-8">
      <h1>{content.title}</h1>
      <Component />
    </section>
  );
};

export default PrivacyPage;
