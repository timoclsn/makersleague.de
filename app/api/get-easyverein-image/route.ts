import { getEasyvereinToken } from "lib/easyverein";

export const runtime = "edge";

const isEasyvereinUrl = (url: URL) =>
  url.protocol === "https:" &&
  (url.hostname === "easyverein.com" ||
    url.hostname.endsWith(".easyverein.com"));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || !URL.canParse(url) || !isEasyvereinUrl(new URL(url))) {
    return new Response(null, {
      status: 400,
    });
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${await getEasyvereinToken()}`,
    },
    redirect: "error",
  });

  if (!response.ok) {
    return new Response(null, {
      status: 502,
    });
  }

  const arraybuffer = await response.arrayBuffer();
  const byteArrays = new Array(arraybuffer);
  const blob = new Blob(byteArrays, { type: "image/png" });

  return new Response(blob);
}
