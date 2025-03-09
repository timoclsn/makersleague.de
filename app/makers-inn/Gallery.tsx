"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import img1 from "../../public/assets/makers-inn/1.jpg";
// import img2 from "../../public/assets/makers-inn/2.jpg";
// import img3 from "../../public/assets/makers-inn/3.jpg";
// import img4 from "../../public/assets/makers-inn/4.jpg";
// import img5 from "../../public/assets/makers-inn/5.jpg";
// import img6 from "../../public/assets/makers-inn/6.jpg";
// import img7 from "../../public/assets/makers-inn/7.jpg";
// import img8 from "../../public/assets/makers-inn/8.jpg";
// import img9 from "../../public/assets/makers-inn/9.jpg";
// import img10 from "../../public/assets/makers-inn/10.jpg";
// import img11 from "../../public/assets/makers-inn/11.jpg";
// import img12 from "../../public/assets/makers-inn/12.jpg";
// import img13 from "../../public/assets/makers-inn/13.jpg";
// import img14 from "../../public/assets/makers-inn/14.jpg";
// import img15 from "../../public/assets/makers-inn/15.jpg";
// import img16 from "../../public/assets/makers-inn/16.jpg";
// import img17 from "../../public/assets/makers-inn/17.jpg";
// import img18 from "../../public/assets/makers-inn/18.jpg";
// import img19 from "../../public/assets/makers-inn/19.jpg";
// import img20 from "../../public/assets/makers-inn/20.jpg";

const Lightbox = dynamic(() =>
  import("@/components/Lightbox").then((mod) => mod.Lightbox),
);

const images = [
  { image: img1, description: "Makers Inn Außenansicht" },
  // { image: img2, description: "Eingangsbereich" },
  // { image: img3, description: "Coworking Space" },
  // { image: img4, description: "Meeting Raum" },
  // { image: img5, description: "Lounge Bereich" },
  // { image: img6, description: "Besprechungsecke" },
  // { image: img7, description: "Gemeinschaftsküche" },
  // { image: img8, description: "Ruhezone" },
  // { image: img9, description: "Innovative Arbeitsplätze" },
  // { image: img10, description: "Kreativraum" },
  // { image: img11, description: "Terrassenbereich" },
  // { image: img12, description: "Networking Area" },
  // { image: img13, description: "Workshop Raum" },
  // { image: img14, description: "Eventbereich" },
  // { image: img15, description: "Relaxzone" },
  // { image: img16, description: "Präsentationsraum" },
  // { image: img17, description: "Maker Space" },
  // { image: img18, description: "Kollaborationsbereich" },
  // { image: img19, description: "Innenansicht" },
  // { image: img20, description: "Arbeitsumgebung" },
];

export const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image.image}
              alt={image.description}
              className="h-full object-cover"
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
          slides={images.map((image) => image.image)}
        />
      )}
    </>
  );
};
