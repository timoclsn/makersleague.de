import { Img, Link } from "@react-email/components";
import { baseUrl } from "../lib/utils";
import { Section } from "./Section";

export const Header = () => {
  return (
    <Section>
      <Link href={baseUrl}>
        <Img
          src={`${baseUrl}/emails/logo.png`}
          width="40"
          height="50"
          alt="LinkedIn"
          className="mx-auto mt-8"
        />
      </Link>
    </Section>
  );
};
