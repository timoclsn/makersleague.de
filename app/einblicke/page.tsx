import { Blog } from "components/Blog";
import { InstagramSection } from "components/InstagramSection";
import { Page } from "components/Page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Einblicke",
  description:
    "Einblicke in die Makers League. Hier findest du unseren Blog und Instagram Bilder.",
};

const InsightsPage = () => {
  return (
    <Page>
      <div>
        <h1 className="mb-16 text-xl font-bold md:text-5xl">Einblicke</h1>
        <InstagramSection />
      </div>
      <Blog />
    </Page>
  );
};

export default InsightsPage;
