"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const Lightbox = dynamic(() =>
  import("@/components/Lightbox").then((mod) => mod.Lightbox),
);

const images = [
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjd338ZhTVlVhiRfCW12EekjdxmAzJHu5IQ7B0N",
    description: "Bild 1",
  },
];

export const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square bg-gray-200">
            <Image
              src={image.src}
              alt={image.description}
              fill
              className="h-full object-contain"
            />
            <button
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
              onClick={() => setOpenIndex(index)}
            >
              <span className="sr-only">
                Öffne Makers Inn Bild {index + 1} in Lightbox
              </span>
            </button>
          </div>
        ))}
      </div>
      {open && (
        <Lightbox
          open={open}
          index={openIndex}
          close={() => setOpenIndex(null)}
          slides={images}
        />
      )}
    </>
  );
};
