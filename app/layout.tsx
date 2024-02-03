import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { Navigation } from "components/Navigation";
import { NextStammtisch } from "components/NextStammtisch/NextStammtisch";
import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import "../styles/globals.css";

const title = "Makers League";
const description =
  "Makers League – Die Gemeinschaft für Macher:innen, die zusammen Ideen voranbringen. Wir entdecken, was in uns steckt und setzen Kräfte frei!";

export const metadata: Metadata = {
  metadataBase: new URL("https://makersleague.de"),
  title: {
    default: title,
    template: `%s • ${title}`,
  },
  description,
  icons: "/favicons/favicon.png",
  openGraph: {
    type: "website",
    title,
    url: "/",
    siteName: title,
    description,
    images: {
      url: "/assets/og-image.png",
      alt: description,
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="de" className={`min-h-screen ${fontSans.variable}`}>
      <body className="flex min-h-screen flex-col text-base text-dark">
        <div className="flex flex-1 flex-row">
          <Navigation />
          <main className="bg-yellow-900 mx-auto flex w-full flex-1 flex-col p-4 md:p-10">
            <Header />
            {children}
          </main>
        </div>
        <Footer />
        <NextStammtisch />
        <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      </body>
    </html>
  );
};

export default RootLayout;
