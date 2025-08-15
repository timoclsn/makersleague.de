import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
  preview: string;
  greeting: string;
}

export const Email = ({ children, preview, greeting }: Props) => {
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

      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          theme: {
            colors: {
              light: "#FFFFFF",
              dark: "#101E17",
              pink: "#d089f0",
              "pink-light": "#f7edfd",
            },
          },
        }}
      >
        <Head />
        <Body className="bg-light">
          <Container className="mx-auto max-w-prose px-4">
            <Header />
            {children}
            <Footer greeting={greeting} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
