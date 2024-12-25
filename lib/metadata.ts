import { Metadata } from "next";

export const createGenerateMetadata = (
  generateMetadata: ({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) => Promise<Metadata>,
) => generateMetadata;
