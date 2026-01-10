import { Bold } from "../components/Bold";
import { Email } from "../components/Email";
import { Heading } from "../components/Heading";
import { Italic } from "../components/Italic";
import { Link } from "../components/Link";
import { NextEvent } from "../components/NextEvent";
import { Section } from "../components/Section";
import { Text } from "../components/Text";

interface Props {
  firstName: string;
  nextEvent?: {
    name: string;
    date: string;
    location: string | null;
    url: string;
  };
}

export const FollowUpEmail = ({ firstName, nextEvent }: Props) => {
  return (
    <Email
      preview="Willkommen bei der Makers League! Teile dein Wissen und werde aktiv in der Community."
      greeting="Wir freuen uns darauf, von dir zu lesen!"
    >
      <Section>
        <Heading>Hi {firstName},</Heading>
        <Text>
          wir hoffen, dein Einstieg bei der <Bold>Makers League</Bold> läuft
          gut! Seit ein paar Wochen bist du nun Teil unserer Community und wir
          möchten gerne wissen, wie es dir bisher ergangen ist. Falls du Fragen
          hast oder Feedback teilen möchtest, zögere nicht, uns zu{" "}
          <Link href="mailto:hello@makersleague.de">kontaktieren</Link>. Deine
          Meinung ist uns wichtig, um uns stetig zu verbessern.
        </Text>

        <Text>
          <Bold>
            <Italic>
              Suchst du nach Möglichkeiten in der Makers League aktiv zu werden?
              Wir haben hier ein paar Optionen für dich:
            </Italic>
          </Bold>
        </Text>
      </Section>

      <Section>
        <Heading as="h2">🧠 Teile dein Wissen</Heading>
        <Text>
          Bei unseren Inspire Talks teilen Makers League Mitglieder oder externe
          Speaker regelmäßig ihre Erfahrungen aus ihrer eigenen
          Gründungsgeschichte. In der Master Class vermitteln Macher*innen
          Wissen aus ihren Themen und Fachgebieten. Bespreche gerne mit Nina
          dein Thema und den passenden Termin oder schreibe eine{" "}
          <Link href="mailto:hello@makersleague.de">Mail</Link>.
        </Text>
      </Section>

      <Section>
        <Heading as="h2">🏆 Werde Macher*in des Monats</Heading>
        <Text>
          Als Macher*in des Monats kannst du 4 Wochen deine Idee oder dein
          Business im Schaufenster des Makers Inn präsentieren. Spreche mit Nina
          oder schreibe eine{" "}
          <Link href="mailto:hello@makersleague.de">Mail</Link>, wenn du
          Interesse hast.
        </Text>
      </Section>

      <Section>
        <Heading as="h2">📆 Organisiere eine Veranstaltung</Heading>
        <Text>
          Möchtest du eine eigene Veranstaltung, einen Workshop oder ein
          besonderes Angebot für die Community oder die Esslinger Öffentlichkeit
          organisieren? Kontaktiere uns per{" "}
          <Link href="mailto:hello@makersleague.de">Mail</Link> oder sprich
          persönlich mit Nina über deine Idee. Im Makers Inn ist fast alles
          möglich, solange es die Innovationskraft Esslingens stärkt oder zur
          Gründungsförderung beiträgt.
        </Text>
      </Section>

      <Section>
        <Heading as="h2">🦸‍♂️🦸‍♀️ Finde weitere Macher*innen</Heading>
        <Text>
          Wir sind uns sicher in Esslingen gibt es noch ganz viele Macher*innen,
          die zu unserem Verein passen. Kennst du jemanden? Bringe sie oder ihn
          gerne zum nächsten After Work mit! Je mehr Macher*innen, desto mehr
          Superkräfte und tolle Projekte in Esslingen!
        </Text>
        {nextEvent && (
          <NextEvent
            name={nextEvent.name}
            date={nextEvent.date}
            location={nextEvent.location}
            url={nextEvent.url}
          />
        )}
      </Section>
    </Email>
  );
};

export default FollowUpEmail;

FollowUpEmail.PreviewProps = {
  firstName: "Timo",
  nextEvent: {
    name: "After Work",
    date: "13.08.",
    location: "Makers Inn",
    url: "https://makersleague.de",
  },
} as Props;
