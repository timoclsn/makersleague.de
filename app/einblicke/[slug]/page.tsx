import { PageLayout } from "@/components/layouts/PageLayout";
import { ApplySection } from "components/ApplySection";
import { Calendar, Profile, Watch } from "components/icons";
import { PageContent } from "components/layouts/PageContent";
import { getAllBlogPosts, getBlog } from "lib/content";
import { createGenerateMetadata } from "lib/metadata";

export const generateMetadata = createGenerateMetadata(async ({ params }) => {
  const { slug } = params;
  const { data } = await getBlog(slug);

  return {
    title: data.title,
    description: data.summary,
  };
});

export const generateStaticParams = async () => {
  const blogPosts = await getAllBlogPosts();
  return blogPosts.map((post) => ({
    slug: post.name,
  }));
};

interface Props {
  params: {
    slug: string;
  };
}

const BlogPostPage = async ({ params }: Props) => {
  const { slug } = params;
  const { data, content } = await getBlog(slug);

  return (
    <PageLayout>
      <PageContent>
        <article className="max-w-prose">
          <h1 className="mb-2 text-base font-bold md:text-2xl">{data.title}</h1>
          <p className="mb-4 text-base opacity-60 md:text-2xl">
            {data.summary}
          </p>
          <ul className="mb-8 flex flex-wrap gap-4 md:gap-8">
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Profile className="text-xl" />
              <span>{data.author}</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Watch className="text-xl" />
              <span>{data.readingTime}</span>
            </li>
            <li className="flex items-center justify-center gap-2 rounded-full bg-blue px-3 py-1 font-bold text-blue-accent">
              <Calendar className="text-xl" />
              <span>{data.publishedAtFormatted}</span>
            </li>
          </ul>
          <div className="prose mb-8">{content}</div>
        </article>
        <ApplySection />
      </PageContent>
    </PageLayout>
  );
};

export default BlogPostPage;
