import { allContentPages } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

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
