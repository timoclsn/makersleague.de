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

const isEasyvereinUrl = (url: URL) =>
  url.protocol === "https:" &&
  (url.hostname === "easyverein.com" ||
    url.hostname.endsWith(".easyverein.com"));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = parseUrl(searchParams.get("url"));

  if (!url || !isEasyvereinUrl(url)) {
    return new Response(null, {
      status: 400,
    });
  }

  const response = await fetch(url, {
    headers: {
      Authorization: await getAuthorizationHeader(),
    },
    redirect: "manual",
  });

  if (!response.ok) {
    return new Response(null, {
      status: 502,
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "image/png",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
