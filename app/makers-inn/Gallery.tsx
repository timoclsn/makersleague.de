"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import img1 from "../../public/assets/makers-inn/1.png";
import img2 from "../../public/assets/makers-inn/2.png";
import img3 from "../../public/assets/makers-inn/3.png";

const Lightbox = dynamic(() =>
  import("@/components/Lightbox").then((mod) => mod.Lightbox),
);

const images = [img1, img2, img3];

export const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image src={image} alt={`Makers Inn Bild ${index + 1}`} />
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
