import type { GetStaticProps } from 'next';
import { Page } from '../../components/Page';
import Profile from '../../assets/ic-profile.svg';
import Watch from '../../assets/ic-watch.svg';
import Date from '../../assets/ic-date.svg';
import { allBlogPosts } from 'contentlayer/generated';
import type { BlogPost } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

interface Props {
  post: BlogPost;
}

export default function BlogPost({ post }: Props) {
  const Component = useMDXComponent(post.body.code);
  return (
    <Page>
      <div className="space-y-20 md:space-y-32">
        <article>
          <h1 className="mb-2 text-base font-bold md:text-2xl">{post.title}</h1>
          <p className="mb-4 text-base opacity-60 md:text-2xl">
            {post.summary}
          </p>
          <ul className="mb-8 flex flex-wrap gap-4 md:gap-8">
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Profile className="text-xl" />
              <span>{post.author}</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Watch className="text-xl" />
              <span>{post.readingTime}</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Date className="text-xl" />
              <span>{post.publishedAtFormatted}</span>
            </li>
          </ul>
          <div className="prose mb-8">
            <Component />
          </div>
        </article>
      </div>
    </Page>
  );
}

export async function getStaticPaths() {
  return {
    paths: allBlogPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allBlogPosts.find((post) => post.slug === params?.slug);
  return { props: { post } };
};
