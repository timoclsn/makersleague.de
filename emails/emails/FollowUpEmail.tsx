import { Bold } from "../components/Bold";
import { Email } from "../components/Email";
import { Footer } from "../components/Footer";
import { Heading } from "../components/Heading";
import { Italic } from "../components/Italic";
import { Link } from "../components/Link";
import { NextStammtisch } from "../components/NextStammtisch";
import { Section } from "../components/Section";
import { Text } from "../components/Text";

interface Props {
  firstName: string;
  nextStammtischDate: string;
  nextStammtischUrl: string;
}

export const FollowUpEmail = ({
  firstName,
  nextStammtischDate,
  nextStammtischUrl,
}: Props) => {
  return (
    <Email preview="Willkommen bei der Makers League! Teile dein Wissen und werde aktiv in der Community.">
      <Section>
        <Heading>Hi {firstName},</Heading>
        <Text>
          wir hoffen, dein Einstieg bei der Makers League läuft gut! Seit ein
          paar Wochen bist du nun Teil unserer Community und wir möchten gerne
          wissen, wie es dir bisher ergangen ist. Falls du Fragen hast oder
          Feedback teilen möchtest, zögere nicht, uns zu{" "}
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
          Gründungsgeschichte. In der Master Class vermitteln MacherInnen Wissen
          aus ihren Themen und Fachgebieten. Bespreche gerne mit Nina dein Thema
          und den passenden Termin oder schreibe eine{" "}
          <Link href="mailto:hello@makersleague.de">Mail</Link>.
        </Text>
      </Section>

      <Section>
        <Heading as="h2">🏆 Werde Macher:in des Monats</Heading>
        <Text>
          Als Macher:in des Monats kannst du 4 Wochen deine Idee oder dein
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
        <Heading as="h2">🦸‍♂️🦸‍♀️ Finde weitere Macher:innen</Heading>
        <Text>
          Wir sind uns sicher in Esslingen gibt es noch ganz viele Macher:innen,
          die zu unserem Verein passen. Kennst du jemanden? Bringe sie oder ihn
          gerne zum nächsten Stammtisch mit! Je mehr Macher:innen, desto mehr
          Superkräfte und tolle Projekte in Esslingen!
        </Text>

        <NextStammtisch date={nextStammtischDate} url={nextStammtischUrl} />
      </Section>

      <Section>
        <Text>
          Wir freuen uns darauf, von dir zu lesen!
          <br />
          <br />
          <Bold>Till, Nina, Jochen, Piet und Norman</Bold>
          <br />
          <Italic>Dein Makers League Vorstand</Italic>
        </Text>
        <Footer />
      </Section>
    </Email>
  );
};

export default FollowUpEmail;

FollowUpEmail.PreviewProps = {
  firstName: "Timo",
  nextStammtischDate: "13.08.",
  nextStammtischUrl: "https://makersleague.de",
} as Props;
