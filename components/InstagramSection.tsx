import { Instagram } from "lucide-react";
import { Button } from "./Button";

export const InstagramSection = async () => {
  return (
    <section id="instagram">
      <h2 className="mb-2 text-base font-bold md:text-2xl">
        Folge uns auf Instagram
      </h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        Bilcke hinter die Kulissen der Makers League
      </p>
      <Button
        href="https://www.instagram.com/makersleague.ev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram className="text-2xl" />
        Zu Instagram
      </Button>
    </section>
  );
};
