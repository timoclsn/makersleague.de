import { allContentPages, ContentPage } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { GetStaticProps } from 'next';
import { Page } from 'components/Page';

interface Props {
  content: ContentPage;
}

export default function Datenschutzerklaerung({ content }: Props) {
  const Component = useMDXComponent(content.body.code);
  return (
    <Page>
      <section className="prose mb-8">
        <h1>{content.title}</h1>
        <Component />
      </section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const content = allContentPages.find(
    (page) => page.title === 'Datenschutzerklärung'
  );
  return { props: { content } };
};
