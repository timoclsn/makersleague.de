import {
  Column,
  Hr,
  Img,
  Link as LinkPrimitive,
  Row,
} from "@react-email/components";
import { getBaseUrl } from "../lib/utils";
import { Bold } from "./Bold";
import { Italic } from "./Italic";
import { Link } from "./Link";
import { Section } from "./Section";
import { Text } from "./Text";

interface Props {
  greeting: string;
}

export const Footer = ({ greeting }: Props) => {
  return (
    <Section>
      <Hr className="mb-8" />
      <Text align="center">
        {greeting}
        <br />
        <br />
        <Bold>Till, Nina, Jochen, Piet und Norman</Bold>
        <br />
        <Italic>Dein Makers League Vorstand</Italic>
      </Text>
      <Text align="center">
        PS: Du bist auf Instagram oder LinkedIn aktiv? Dann vergiss nicht uns zu
        folgen und uns für Reposts zu verlinken{" "}
        <Link href="https://linktr.ee/makersleague">
          Hier geht&apos;s zu unseren Kanälen
        </Link>
        .
      </Text>
      <Row className="w-auto">
        <Column align="right">
          <LinkPrimitive href="https://www.instagram.com/makersleague.ev">
            <Img
              src={`${getBaseUrl()}/emails/instagram.png`}
              width="44"
              height="44"
              alt="Instagram"
              className="mx-2"
            />
          </LinkPrimitive>
        </Column>
        <Column align="center">
          <LinkPrimitive href={getBaseUrl()}>
            <Img
              src={`${getBaseUrl()}/emails/globe.png`}
              width="44"
              height="44"
              alt="Website"
              className="mx-2"
            />
          </LinkPrimitive>
        </Column>
        <Column align="left">
          <LinkPrimitive href="https://de.linkedin.com/company/makersleague">
            <Img
              src={`${getBaseUrl()}/emails/linkedin.png`}
              width="44"
              height="44"
              alt="LinkedIn"
              className="mx-2"
            />
          </LinkPrimitive>
        </Column>
      </Row>
    </Section>
  );
};
