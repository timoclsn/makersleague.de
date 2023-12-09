import { getImagesCached } from "lib/instagram";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";
import Link from "next/link";
import { Arrow } from "icons";

export const InstagramSection = async () => {
  const images = await getImagesCached();
  return (
    <section id="instagram">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">
          Folge uns auf Instagram
        </h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Bilcke hinter die Kulissen der Makers League
        </p>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {images.map((image) => {
            const isVideo = image.media_url.includes("mp4");
            return (
              <li key={image.id} className="border-4 p-4">
                <div className="relative mb-14 aspect-square">
                  {isVideo ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      src={image.media_url}
                      className="absolute inset-0 h-full w-full bg-pink object-cover"
                    />
                  ) : (
                    <Image
                      src={image.media_url}
                      alt="Instagram Image"
                      width={200}
                      height={200}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex w-full flex-1 flex-col items-end justify-end">
                  <Link
                    href={image.permalink}
                    className="flex items-center justify-center gap-1 self-end font-bold text-pink hover:opacity-80"
                  >
                    <Instagram className="text-2xl" />
                    <span className="sr-only">Auf Instagram ansehen</span>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        href="https://www.instagram.com/makersleague.ev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram className="text-2xl" />
        Mehr auf Instagram
      </Button>
    </section>
  );
};
