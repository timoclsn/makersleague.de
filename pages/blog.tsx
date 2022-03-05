import { GetStaticProps } from 'next';
import Link from 'next/link';
import { pick } from 'contentlayer/client';
import { allBlogPosts, BlogPost } from 'contentlayer/generated';

import { Button } from '../components/Button';
import { Page } from '../components/Page';

import { Profile, Watch, Calendar, Arrow } from 'icons';

interface Props {
  posts: BlogPost[];
}

export default function Blogpage({ posts }: Props) {
  return (
    <Page>
      <section>
        <h1 className="mb-16 text-xl font-bold md:text-5xl">Blog</h1>
        <div className="space-y-24">
          {posts.map((post, idx) => (
            <article key={idx}>
              <h2 className="mb-2 text-base font-bold md:text-2xl">
                {post.title}
              </h2>
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
                  <Calendar className="text-xl" />
                  <span>{post.publishedAtFormatted}</span>
                </li>
              </ul>
              <Link href={`/blog/${post.slug}`} passHref>
                <Button as="a" color="sand">
                  <Arrow className="text-2xl" />
                  Weiterlesen...
                </Button>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const posts = allBlogPosts
    .map((post) =>
      pick(post, [
        'slug',
        'title',
        'summary',
        'publishedAt',
        'readingTime',
        'author',
        'publishedAtFormatted',
      ])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { posts } };
};
