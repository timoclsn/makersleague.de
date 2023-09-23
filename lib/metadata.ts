import { Metadata } from 'next';

export const createGenerateMetadata = (
  generateMetadata: ({
    params,
  }: {
    params: { slug: string };
  }) => Promise<Metadata>,
) => generateMetadata;
