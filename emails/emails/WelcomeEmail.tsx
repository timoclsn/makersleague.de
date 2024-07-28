import { Bold } from "../components/Bold";
import { Button } from "../components/Button";
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

export const WelcomeEmail = ({
  firstName,
  nextStammtischDate,
  nextStammtischUrl,
}: Props) => {
  return (
    <Email preview="Willkommen in der Makers League! Entdecke unsere Werte und trete der Community bei.">
      <Section>
        <Heading>Hi {firstName},</Heading>
        <Text>
          herzlich willkommen in der Makers League! Wir freuen uns sehr, dich
          als neues Mitglied unserer Community zu begrüßen.
        </Text>
      </Section>

      <Section>
        <Heading as="h2">❤️ Unsere Werte</Heading>
        <Text>
          Unser Vereinsleben basiert auf den drei Werten <Bold>O</Bold>
          ffenheit, <Bold>M</Bold>achen und <Bold>G</Bold>emeinschaft. (kurz
          OMG) <Link href="https://makersleague.de/core-values/">Hier</Link>{" "}
          findest du eine ausführliche Beschreibung unserer Werte. Uns ist sehr
          wichtig, dass diese Werte wertgeschätzt und gelebt werden.
        </Text>
        <Text>
          Zudem sei gesagt: Wir sind ein junger Verein und bauen gemeinsam mit
          dir unsere Community auf. Noch ist nicht alles perfekt, aber das ist
          Teil unserer DNA: Wir MACHEN gemeinsam. Jede:r packt an, Jede:r kann
          kreieren. Ob es darum geht, Know-how mit der Community zu teilen, das
          Makers Inn zu einem noch inspirierenderen Ort zu machen oder eigene
          Circles und Projekte ins Leben zu rufen – wir freuen uns über jedes
          Engagement und jede Idee.
        </Text>
        <Text>
          <Italic>Wo findest du die anderen Macher:innen?</Italic>
        </Text>
      </Section>

      <Section>
        <Heading as="h2">📱 WhatsApp Community</Heading>
        <Text>
          Trete mit{" "}
          <Link href="https://chat.whatsapp.com/HHrRl5Gl2nwJlKO6BIhYax">
            diesem Link
          </Link>{" "}
          unserer WhatsApp Community bei und bleibe immer auf dem Laufenden! Im
          Makers League Chat kannst du den anderen Mitgliedern Fragen stellen,
          Tipps teilen und sonstige News rund um unsere Community erfahren.
          Zusätzlich kannst du gerne weiteren Gruppen in der Makers League
          Community beitreten.
        </Text>
        <div className="my-4 flex justify-center">
          <Button href="https://chat.whatsapp.com/HHrRl5Gl2nwJlKO6BIhYax">
            Jetzt WhatsApp Community beitreten
          </Button>
        </div>
      </Section>

      <Section>
        <Heading as="h2">🍻 Stammtisch und Events</Heading>
        <Text>
          Unser Stammtische und Inspire Talks findet üblicherweise am 2. und 4.
          Dienstag jedes Monats um 18:00 Uhr im Makers Inn statt. Zusätzlich
          bieten wir monatlich eine Makers League Masterclass an und ab und an
          weitere Specials wie Workshops oder Meetups.
          <Link href="https://makersleague.de/events">Hier</Link> findest du
          alle Termine und kannst dich direkt für unser Community Events
          anmelden.
        </Text>

        <NextStammtisch date={nextStammtischDate} url={nextStammtischUrl} />
      </Section>

      <Section>
        <Heading as="h2">☑️ Communitymanagement</Heading>
        <Text>
          Unsere Community wird über die Vereinssoftware Easyverein organisiert.
          Den Einladungslink mit deinen Login-Daten für den Zugang zu unserem
          Mitgliederbereich (Vereinskürzel ML) hast du gerade per E-Mail
          erhalten. Hier kannst du deine persönlichen Daten bearbeiten, findest
          die Kontakte der anderen Mitglieder und kannst dich zu unseren Events
          anmelden. Wir empfehlen die Installation der Easyverein App (verfügbar
          für{" "}
          <Link href="https://apps.apple.com/de/app/easyverein-vereinsverwaltung/id1582761507">
            iOS
          </Link>{" "}
          und{" "}
          <Link href="https://play.google.com/store/apps/details?id=com.softwaredesign.easyverein&hl=de&pli=1">
            Android
          </Link>
          ), alternativ kannst du dich aber auch über unsere Website im{" "}
          <Link href="https://easyverein.com/public/ML/">
            Mitgliederbereich
          </Link>{" "}
          einloggen.
        </Text>
      </Section>

      <Section>
        <Heading as="h2">🦸‍♂️🦸‍♀️ Unsere & deine Superkräfte</Heading>
        <Text>
          Jede:r von uns hat andere “Superkräfte”. So wollen wir uns gemeinsam
          unterstützen und voneinander lernen. Unsere Mitglieder erstellen daher
          kurze Steckbriefe mit ihren drei stärksten Kompetenzen.{" "}
          <Link href="https://makersleague.de/mitglieder">
            Beispiel gefällig
          </Link>
          ? Bitte fülle deinen Steckbrief im Easyverein Mitgliederbereich aus
          und lade ein Profilbild hoch. Du findest den entsprechenden Reiter im
          Menü. Schicke zusätzlich ein möglichst hochauflösendes Portraitbild
          (Betreff Steckbrief) per Mail an{" "}
          <Link href="mailto:daniela@makersleague.de">Lela</Link>. Dadurch wirst
          auch du bald Teil unserer Macher:innen Galerie im Makers Inn und auf
          unserer Website.
        </Text>
      </Section>

      <Section>
        <Heading as="h2">🤨 Weitere Fragen</Heading>
        <Text>
          Du hast sicher noch einige Fragen zur Makers League.{" "}
          <Link href="https://makersleague.de/haeufige-fragen/">Hier</Link>{" "}
          beantworten wir dir die am häufigsten gestellten Fragen. Solltest du
          weitere Fragen haben kannst du uns jederzeit eine E-Mail an{" "}
          <Link href="mailto:hello@makersleague.de">hello@makersleague.de</Link>{" "}
          senden.
        </Text>
      </Section>

      <Section>
        <Text>
          Jetzt kann es für dich losgehen! Wir freuen uns auf dich!
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

export default WelcomeEmail;

WelcomeEmail.PreviewProps = {
  firstName: "Timo",
  nextStammtischDate: "13.08.",
  nextStammtischUrl: "https://makersleague.de",
} as Props;
