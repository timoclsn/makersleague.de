import { getImagesCached } from "lib/instagram";
import Image from "next/image";

export const InstagramSection = async () => {
  const images = await getImagesCached();
  return (
    <div className="grid-cols-3">
      {images.map((image) => {
        return (
          <Image
            key={image.id}
            src={image.media_url}
            alt="Instagram Image"
            width={200}
            height={200}
          />
        );
      })}
    </div>
  );
};
