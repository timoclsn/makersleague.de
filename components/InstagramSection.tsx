import { getImagesCached } from "lib/instagram";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";

export const InstagramSection = async () => {
  const images = await getImagesCached();
  return (
    <section id="instagram">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">Instagram</h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Folge uns auf Instagram
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {images.map((image) => {
          return (
            <li key={image.id} className="relative aspect-square border-4">
              <Image
                src={image.media_url}
                alt="Instagram Image"
                width={200}
                height={200}
                className="absolute inset-0 h-full w-full object-cover p-4"
              />
            </li>
          );
        })}
      </ul>
      <Button href="https://www.instagram.com/makersleague.ev">
        <Instagram className="text-2xl" />
        Mehr auf Instagram
      </Button>
    </section>
  );
};
