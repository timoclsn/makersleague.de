import { ApplySection } from "components/ApplySection";
import { ContactSection } from "components/ContactSection/ContactSection";
import { FaqsSection } from "components/FaqsSection";
import { FitSection } from "components/FitSection";
import { Page } from "components/Page";
import { ValuesSection } from "components/ValuesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitglied werden",
  description: "Makers League Mitglied werden",
};

const BecomeMemberPage = () => {
  return (
    <Page>
      <section>
        <h1 className="mb-4 text-base opacity-80 md:text-2xl">
          Mitglied werden
        </h1>
        <h2 className="mb-11 text-xl font-bold leading-tight md:text-5xl md:leading-tight">
          Du möchtest Teil unseres Macher*innen Netzwerks werden? Dann findest
          du hier alle wichtigen Infos!
        </h2>
      </section>
      <ApplySection />
      <FitSection />
      <ValuesSection />
      <FaqsSection />
      <ContactSection />
    </Page>
  );
};

export default BecomeMemberPage;
