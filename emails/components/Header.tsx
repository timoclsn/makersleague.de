import { Img, Link } from "@react-email/components";
import { getBaseUrl } from "../lib/utils";
import { Section } from "./Section";

export const Header = () => {
  return (
    <Section>
      <Link href={getBaseUrl()}>
        <Img
          src={`${getBaseUrl()}/emails/logo.png`}
          width="40"
          height="50"
          alt="LinkedIn"
          className="mx-auto mt-8"
        />
      </Link>
    </Section>
  );
};
