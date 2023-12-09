import { z } from "zod";
import { cache as reactCache } from "react";
import { unstable_cache as nextCache } from "next/cache";

const userId = z.string().parse(process.env.INSTAGRAM_USER_ID);
const accessToken = z.string().parse(process.env.INSTAGRAM_ACCESS_TOKEN);

const imageIdSchema = z.object({
  id: z.string(),
});

const imageUrlsSchema = z.object({
  id: z.string(),
  media_url: z.string().url(),
  permalink: z.string().url(),
});

const getUserImageIds = async () => {
  const response = await fetch(
    `https://graph.instagram.com/${userId}/media?access_token=${accessToken}`,
  );
  const json = await response.json();
  return z.array(imageIdSchema).parse(json.data).slice(0, 9);
};

const getImages = async () => {
  const imageIds = await getUserImageIds();

  const imageUrls = await Promise.all(
    imageIds.map(async ({ id }) => {
      const response = await fetch(
        `https://graph.instagram.com/${id}?fields=media_url,permalink&access_token=${accessToken}`,
      );
      const json = await response.json();
      return imageUrlsSchema.parse(json);
    }),
  );

  return imageUrls;
};

export const getImagesCached = reactCache(async () => {
  return await nextCache(getImages, ["instagram-images"], {
    revalidate: 60,
    tags: ["instagram-images"],
  })();
});
