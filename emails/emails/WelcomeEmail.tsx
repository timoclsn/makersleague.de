import {
  Body,
  Container,
  Font,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

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
          url: "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Preview>Herzlich Willkommen in der Makers League! 🎉</Preview>
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
            <Heading className="text-3xl">
              Herzlich Willkommen in der Makers League, {firstName}! 🎉
            </Heading>
            <Text>Hier steht dann Text!</Text>
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
