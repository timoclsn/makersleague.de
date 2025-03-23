"use client";

import { AutoAnimate } from "@/components/AutoAnimate";
import { Button } from "@/components/Button";
import { track } from "@/lib/tracking";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const Lightbox = dynamic(() =>
  import("@/components/Lightbox").then((mod) => mod.Lightbox),
);

const images = [
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjd338ZhTVlVhiRfCW12EekjdxmAzJHu5IQ7B0N",
    description: "Makers Inn Bild 1",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdzamOzp4pU8mSFgnAZ4IjiNhYBkREOvVfDXoc",
    description: "Makers Inn Bild 2",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdUpTMjnjdATVG7RSsNX6LCntb01OzKPFWYQmq",
    description: "Makers Inn Bild 3",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdrwtQlPfEVe1aOCdFLcxXPQu09nvTYb4kmMBH",
    description: "Makers Inn Bild 4",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdquO0WjMWrz8Nati4dyIBTDVsRhE9lf3mKUOn",
    description: "Makers Inn Bild 5",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdhfyjZvtfD8zIlar1wTSdYQKecoZOWg0vGpCE",
    description: "Makers Inn Bild 6",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdRqPr7YbgR9OQfwW1k2Y3oIdeCr4BPFiHJT57",
    description: "Makers Inn Bild 7",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdSOlyGxFiUWjdwoJ9Zg7aLxD1npPvOMYFcmGH",
    description: "Makers Inn Bild 8",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdx5tFjRaWRoepTC87UH5Glivsrd9xLbzaM1c3",
    description: "Makers Inn Bild 9",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdgM5rqhPY5uHID4B8JX3RVihld6fjtTNpsezS",
    description: "Makers Inn Bild 10",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdQuPqQ4N5nF0A82NRieKoD9xYOqWyzlS67aCr",
    description: "Makers Inn Bild 11",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdKRYF1e50GADEB4yXM6pCHcnhujfW3qPRQdxN",
    description: "Makers Inn Bild 12",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjd26707QbNrXa9Ak5jzyU6s48Tm0Cix1gIZvbp",
    description: "Makers Inn Bild 13",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdbKuHxRT3cxsmPza7gMRTES1QihI6dNq04Xne",
    description: "Makers Inn Bild 14",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdLySW2rkqkfBEMG7rhUlija5NuTQsFbzewR3V",
    description: "Makers Inn Bild 15",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjd4kBeRuUARkq7TK4IWhS3N9J6jE1nLtVMeDGd",
    description: "Makers Inn Bild 16",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjd5omRwkWGXdzNQC1nP2FrUvDyiTxWBb4sgejL",
    description: "Makers Inn Bild 17",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdrVM6txfEVe1aOCdFLcxXPQu09nvTYb4kmMBH",
    description: "Makers Inn Bild 18",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjd1aIBGWl5TFRugcz9DMbfmPXYGkINn4wWeVEv",
    description: "Makers Inn Bild 19",
  },
  {
    src: "https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdEGbcprvT9jN8Z6iMtW7VXhAIpR24OeLFz3qJ",
    description: "Makers Inn Bild 20",
  },
];

export const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;

  const initialImagesToDisplay = 4;
  const [imagesToDisplay, setImagesToDisplay] = useState(
    initialImagesToDisplay,
  );
  const showMoreBtn = imagesToDisplay < images.length;

  return (
    <>
      <AutoAnimate as="ul" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {images.slice(0, imagesToDisplay).map((image, index) => (
          <li key={index} className="relative aspect-square bg-gray-200">
            <Image
              src={image.src}
              alt={image.description}
              fill
              className="h-full object-contain"
            />
            <button
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
              onClick={() => {
                track("Gallery opened", { image: image.src });
                return setOpenIndex(index);
              }}
            >
              <span className="sr-only">
                Öffne Makers Inn Bild {index + 1} in Lightbox
              </span>
            </button>
          </li>
        ))}
      </AutoAnimate>
      {showMoreBtn && (
        <div className="mt-8 flex items-center justify-center">
          <Button
            onClick={() =>
              setImagesToDisplay(imagesToDisplay + initialImagesToDisplay)
            }
          >
            Mehr anzeigen
          </Button>
        </div>
      )}
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
