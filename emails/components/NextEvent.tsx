import {
  Column,
  Heading,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { makersInn } from "../../lib/events";
import { Button } from "./Button";

interface Props {
  name: string;
  date: string;
  location: string | null;
  url: string;
}

export const NextEvent = ({ name, date, location, url }: Props) => {
  const isMakersInn = location && makersInn(location);

  return (
    <Section className="mx-auto w-full">
      <Section className="bg-pink text-pink-light max-w-[400px] p-4 text-sm">
        <Heading as="h2" className="text-light my-0 mb-2 text-base font-bold">
          Nächstes Event: {name}
        </Heading>
        <Text className="my-0 mb-2">
          Am <span className="font-bold">{date}</span>
          {location && (
            <>
              {isMakersInn ? (
                <>
                  {" "}
                  im{" "}
                  <Link
                    href="https://maps.app.goo.gl/bgpY6u8SerF1wMbZ8"
                    target="_blank"
                    className="text-pink-light underline"
                  >
                    Makers Inn
                  </Link>
                </>
              ) : (
                <> – {location}</>
              )}
            </>
          )}
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
