import { allContentPages } from 'contentlayer/generated';
import { Metadata } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Makers League Impressum',
};

const ImprintPage = () => {
  const content = allContentPages.find((page) => page.title === 'Impressum');
  if (!content) {
    notFound();
  }
  const Component = useMDXComponent(content.body.code);
  return (
    <section className="prose mb-8">
      <h1>{content.title}</h1>
      <Component />
    </section>
  );
};

export default ImprintPage;
