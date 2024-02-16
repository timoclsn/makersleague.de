import { z } from "zod";
import { cache as reactCache } from "react";
import { unstable_cache as nextCache } from "next/cache";

const userId = z.string().parse(process.env.INSTAGRAM_USER_ID);
const accessToken = z.string().parse(process.env.INSTAGRAM_ACCESS_TOKEN);

const mediaIdSchema = z.object({
  id: z.string(),
});

const mediaUrlsSchema = z.object({
  id: z.string(),
  media_url: z.string().url(),
  permalink: z.string().url(),
});

const getUserMediaIds = async (count: number) => {
  const response = await fetch(
    `https://graph.instagram.com/${userId}/media?access_token=${accessToken}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const json = await response.json();
  return z.array(mediaIdSchema).parse(json.data).slice(0, count);
};

export const getMedia = async (count: number) => {
  const mediaIds = await getUserMediaIds(count);

  return await Promise.all(
    mediaIds.map(async ({ id }) => {
      const response = await fetch(
        `https://graph.instagram.com/${id}?fields=media_url,permalink&access_token=${accessToken}`,
        {
          next: {
            revalidate: 60,
          },
        },
      );
      const json = await response.json();
      return mediaUrlsSchema.parse(json);
    }),
  );
};
