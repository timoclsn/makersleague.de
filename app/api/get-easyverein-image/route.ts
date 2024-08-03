export const runtime = "edge";

const { EASYVEREIN_TOKEN } = process.env;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(null, {
      status: 400,
    });
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${EASYVEREIN_TOKEN}`,
    },
  });

  const arraybuffer = await response.arrayBuffer();
  const byteArrays = new Array(arraybuffer);
  const blob = new Blob(byteArrays, { type: "image/png" });

  return new Response(blob);
}
