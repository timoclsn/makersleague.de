import { Arrow, Book, Calendar } from "components/icons";
import { getAllBlogPosts } from "lib/content";
import { ReactNode } from "react";
import { Button } from "./Button";

export const BlogSection = async () => {
  const allBlogPosts = await getAllBlogPosts();
  const blogPosts = allBlogPosts
    .sort(
      (a, b) =>
        Number(new Date(b.data.publishedAt)) -
        Number(new Date(a.data.publishedAt)),
    )
    .slice(0, 3);
  return (
    <section id="blog" className="bg-sand p-8 text-dark">
      <h2 className="mb-2 text-base font-bold lg:text-2xl">Neue Blogposts</h2>
      <p className="mb-10 text-base opacity-60 lg:text-2xl">
        Die neuesten Geschichten rund um die Makers League
      </p>

      <ul className="mb-14 grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-8">
        {blogPosts.map((blogPost, index) => {
          return (
            <li key={index} className="flex flex-col justify-between">
              <div>
                <h2
                  className="mb-2 truncate text-base font-bold lg:text-xl"
                  title={blogPost.data.title}
                >
                  {blogPost.data.title}
                </h2>
                <ul className="mb-8 flex flex-wrap gap-2 text-sm">
                  <Tag>
                    <Calendar />
                    {blogPost.data.publishedAtFormatted}
                  </Tag>
                </ul>
                <p className="line-clamp-2 sm:line-clamp-3 lg:line-clamp-5">
                  {blogPost.data.summary}
                </p>
              </div>
              <div className="mt-8 flex flex-col md:items-start">
                <Button
                  color="dark"
                  variant="outline"
                  size="small"
                  href={`/einblicke/${blogPost.name}`}
                >
                  <Arrow className="text-2xl" />
                  Weiterlesen
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <Button color="dark" variant="solid" size="medium" href="/einblicke#blog">
        <Book className="text-2xl" />
        Alle Blogposts
      </Button>
    </section>
  );
};

interface TagProps {
  children: ReactNode;
}

const Tag = ({ children }: TagProps) => {
  return (
    <li className="flex items-center justify-center gap-2 rounded-full bg-dark px-2 py-1 font-bold text-light">
      {children}
    </li>
  );
};
