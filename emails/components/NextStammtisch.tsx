import {
  Column,
  Heading,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Button } from "./Button";

interface Props {
  date: string;
  url: string;
}

export const NextStammtisch = ({ date, url }: Props) => {
  return (
    <Section className="mx-auto w-full">
      <Section className="max-w-[400px] bg-pink p-4 text-sm text-pink-light">
        <Heading as="h2" className="my-0 mb-2 text-base font-bold text-light">
          Nächster Stammtisch:
        </Heading>
        <Text className="my-0 mb-2">
          Am <span className="font-bold">{date}</span> im{" "}
          <Link
            href="https://maps.app.goo.gl/bgpY6u8SerF1wMbZ8"
            target="_blank"
            className="text-pink-light underline"
          >
            Makers Inn
          </Link>
          .<br />
          Jede*r ist willkommen!
        </Text>
        <Row>
          <Column align="right">
            <Button href={url} color="light">
              Jetzt anmelden!
            </Button>
          </Column>
        </Row>
      </Section>
    </Section>
  );
};
