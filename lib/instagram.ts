import { z } from "zod";

const { INSTAGRAM_USER_ID, INSTAGRAM_ACCESS_TOKEN } = process.env;

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
    `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?access_token=${INSTAGRAM_ACCESS_TOKEN}`,
  );
  const json = await response.json();
  return z.array(mediaIdSchema).parse(json.data).slice(0, count);
};

export const getMedia = async (count: number) => {
  const mediaIds = await getUserMediaIds(count);

  return await Promise.all(
    mediaIds.map(async ({ id }) => {
      const response = await fetch(
        `https://graph.instagram.com/${id}?fields=media_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
      );
      const json = await response.json();
      return mediaUrlsSchema.parse(json);
    }),
  );
};
