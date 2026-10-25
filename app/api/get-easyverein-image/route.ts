import { getAuthorizationHeader } from "lib/easyverein";

export const runtime = "edge";

const parseUrl = (value: string | null) => {
  if (!value) return null;
  try {
    return new URL(value);
  } catch {
    return null;
  }
};

// Only profile pictures; the token must never reach other easyVerein URLs like the API
const isProfilePictureUrl = (url: URL) =>
  url.protocol === "https:" &&
  url.hostname === "easyverein.com" &&
  url.pathname.startsWith("/app/image/");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = parseUrl(searchParams.get("url"));

  if (!url || !isProfilePictureUrl(url)) {
    return new Response(null, {
      status: 400,
    });
  }

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Authorization: await getAuthorizationHeader(),
      },
      redirect: "manual",
    });
  } catch (error) {
    console.error("Failed to fetch easyVerein image:", error);
    return new Response(null, {
      status: 502,
    });
  }

  const contentType = response.headers.get("Content-Type");

  if (!response.ok || !contentType?.startsWith("image/")) {
    return new Response(null, {
      status: 502,
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
