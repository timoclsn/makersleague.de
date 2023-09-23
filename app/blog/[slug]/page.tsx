import { allBlogPosts } from 'contentlayer/generated';
import { Calendar, Profile, Watch } from 'icons';
import { createGenerateMetadata } from 'lib/metadata';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = params;
  const post = allBlogPosts.find((post) => post.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
  };
});

export const generateStaticParams = async () => {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
};

interface Props {
  params: {
    slug: string;
  };
}

const BlogPostPage = ({ params }: Props) => {
  const { slug } = params;
  const post = allBlogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const Component = useMDXComponent(post.body.code);

  return (
    <article className="max-w-prose">
      <h1 className="mb-2 text-base font-bold md:text-2xl">{post.title}</h1>
      <p className="mb-4 text-base opacity-60 md:text-2xl">{post.summary}</p>
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
      <div className="prose mb-8">
        <Component />
      </div>
    </article>
  );
};

export default BlogPostPage;
