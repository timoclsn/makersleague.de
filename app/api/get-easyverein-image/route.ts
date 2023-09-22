import { NextResponse } from 'next/server';

export const runtime = 'edge';

const easyvereinToken = process.env.EASYVEREIN_TOKEN ?? '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
    next: { revalidate: 60 },
  });

  const arraybuffer = await response.arrayBuffer();
  const byteArrays = new Array(arraybuffer);
  const blob = new Blob(byteArrays, { type: 'image/png' });

  return new Response(blob);
}
