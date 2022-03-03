import type { NextRequest } from 'next/server';

const easyvereinToken = process.env.EASYVEREIN_TOKEN ?? '';

export async function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const url = searchParams.get('url');

  if (!url) {
    return new Response(null, {
      status: 400,
    });
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${easyvereinToken}`,
    },
  });

  const arraybuffer = await response.arrayBuffer();
  const byteArrays = new Array(arraybuffer);
  const blob = new Blob(byteArrays, { type: 'image/png' });

  return new Response(blob);
}
