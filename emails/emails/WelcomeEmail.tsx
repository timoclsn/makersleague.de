import {
  Body,
  Container,
  Font,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { Bold } from "../components/Bold";
import { Heading } from "../components/Heading";
import { Italic } from "../components/Italic";
import { Link } from "../components/Link";
import { Text } from "../components/Text";

interface Props {
  firstName: string;
}

export const WelcomeEmail = ({ firstName }: Props) => {
  return (
    <Html>
      <Font
        fontFamily="Space Grotesk"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2",
          format: "woff2",
        }}
        fontWeight="300 700"
        fontStyle="normal"
      />

      <Preview>Herzlich Willkommen in der Makers League</Preview>
      <Tailwind
        config={{
          theme: {
            colors: {
              white: "#FFFFFF",
              dark: "#101E17",
            },
          },
        }}
      >
        <Body className="bg-white">
          <Container className="mx-auto px-4">
            <Heading>Hi {firstName},</Heading>
            <Text>
              herzlich willkommen in der Makers League! Wir freuen uns sehr,
              dich als neues Mitglied unserer Community zu begrüßen.
            </Text>
            <Heading as="h2">❤️ Unsere Werte</Heading>
            <Text>
              Unser Vereinsleben basiert auf den drei Werten <Bold>O</Bold>
              ffenheit, <Bold>M</Bold>achen und <Bold>G</Bold>emeinschaft. (kurz
              OMG) <Link href="https://makersleague.de/core-values/">Hier</Link>{" "}
              findest du eine ausführliche Beschreibung unserer Werte. Uns ist
              sehr wichtig, dass diese Werte wertgeschätzt und gelebt werden.
            </Text>

            <Text>
              Zudem sei gesagt: Wir sind ein junger Verein und bauen gemeinsam
              mit dir unsere Community auf. Noch ist nicht alles perfekt, aber
              das ist Teil unserer DNA: Wir MACHEN gemeinsam. Jede:r packt an,
              Jede:r kann kreieren. Ob es darum geht, Know-how mit der Community
              zu teilen, das Makers Inn zu einem noch inspirierenderen Ort zu
              machen oder eigene Circles und Projekte ins Leben zu rufen – wir
              freuen uns über jedes Engagement und jede Idee.
            </Text>

            <Text>
              <Italic>Wo findest du die anderen Macher:innen?</Italic>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;

WelcomeEmail.PreviewProps = {
  firstName: "Timo",
} as Props;
