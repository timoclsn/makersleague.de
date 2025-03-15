'use client';

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "./Button";

interface Props {
  className?: string;
}

export const Map = ({ className }: Props) => {
  const [hasConsent, setHasConsent] = useState(false);

  if (!hasConsent) {
    return (
      <div className={`relative flex aspect-video w-full items-center justify-center overflow-hidden bg-gray-50 ${className}`}>
        <div className="flex max-w-lg flex-col items-center gap-4 p-4 text-center sm:gap-6 sm:p-8">
          <MapPin className="h-6 w-6 text-pink sm:h-8 sm:w-8" />
          <div>
            <h3 className="mb-2 text-sm font-bold sm:text-base">Externe Karte laden?</h3>
            <p className="text-xs opacity-80 sm:text-sm">
              Mit dem Laden der Karte akzeptierst du die Übermittlung von Daten an OpenStreetMap.
            </p>
          </div>
          <Button onClick={() => setHasConsent(true)}>
            Karte anzeigen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full overflow-hidden ${className}`}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src="https://www.openstreetmap.org/export/embed.html?bbox=9.310345%2C48.738771%2C9.312345%2C48.740771&amp;layer=mapnik&amp;marker=48.739771%2C9.311345"
        style={{ border: 0 }}
        title="Makers Inn Location Map"
      />
    </div>
  );
}; 