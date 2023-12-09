import { getImagesCached } from "lib/instagram";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";
import Link from "next/link";

export const InstagramSection = async () => {
  const images = await getImagesCached();
  return (
    <section id="instagram">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">Instagram</h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Bilcke hinter die Kulissen der Makers League
        </p>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {images.map((image) => {
            const isVideo = image.media_url.includes("mp4");
            return (
              <li key={image.id} className="relative aspect-square border-4">
                <Link
                  href={image.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  {isVideo ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      src={image.media_url}
                      className="absolute inset-0 h-full w-full object-cover p-4"
                    />
                  ) : (
                    <Image
                      src={image.media_url}
                      alt="Instagram Image"
                      width={200}
                      height={200}
                      className="absolute inset-0 h-full w-full object-cover p-4"
                    />
                  )}
                </Link>
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
