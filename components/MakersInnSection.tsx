import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "./Button";
import { Arrow } from "./icons";

export const MakersInnSection = () => {
  return (
    <section className="bg-blue p-8">
      <h2 className="mb-6 text-xl font-bold md:text-5xl">Makers Inn</h2>
      <div className="mb-8 flex flex-col gap-12 md:flex-row">
        <div className="flex-1">
          <p className="mb-6">
            Das Makers Inn ist die zentrale Anlaufstelle für Menschen mit Ideen
            in Esslingen. Ein Ort zum Arbeiten, Vernetzen und Wachsen - mitten
            in der Esslinger Altstadt.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 flex-none text-blue-accent" />
              <span>Zentrale Lage</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 flex-none text-blue-accent" />
              <span>280qm Open Space</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 flex-none text-blue-accent" />
              <span>Events & Workshops</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-video flex-1 overflow-hidden">
          <Image
            src="https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdUppCGDzdATVG7RSsNX6LCntb01OzKPFWYQmq"
            alt="Makers Inn"
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </div>
      <Button href="/makers-inn" color="blue-accent">
        <Arrow className="text-2xl" />
        Mehr erfahren
      </Button>
    </section>
  );
};
