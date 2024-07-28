import {
  Body,
  Container,
  Font,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  preview: string;
}

export const Email = ({ children, preview }: Props) => {
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
        <Body className="bg-light">
          <Container className="mx-auto px-4">{children}</Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
