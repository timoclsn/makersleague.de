import {
  Column,
  Hr,
  Img,
  Link as LinkPrimitive,
  Row,
} from "@react-email/components";
import { baseUrl } from "../lib/utils";
import { Link } from "./Link";
import { Text } from "./Text";
import { Section } from "./Section";
import { Bold } from "./Bold";
import { Italic } from "./Italic";

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
          Hier geht's zu unseren Kanälen
        </Link>
        .
      </Text>
      <Row>
        <Column align="right">
          <LinkPrimitive href="https://www.instagram.com/makersleague.ev">
            <Img
              src={`${baseUrl}/emails/instagram.png`}
              width="44"
              height="44"
              alt="Instagram"
              className="mx-2"
            />
          </LinkPrimitive>
        </Column>
        <Column align="left">
          <LinkPrimitive href="https://de.linkedin.com/company/makersleague">
            <Img
              src={`${baseUrl}/emails/linkedin.png`}
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
