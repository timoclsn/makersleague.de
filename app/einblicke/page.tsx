import { BlogSection } from "components/BlogSection";
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
      <InstagramSection count={9} />
      <BlogSection />
    </Page>
  );
};

export default InsightsPage;
