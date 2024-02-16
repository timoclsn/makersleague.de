import { pick } from "contentlayer/client";
import { allBlogPosts } from "contentlayer/generated";
import { Arrow, Calendar, Profile, Watch } from "icons";
import { Button } from "./Button";

export const BlogSection = () => {
  const posts = allBlogPosts
    .map((post) =>
      pick(post, [
        "_id",
        "slug",
        "title",
        "summary",
        "publishedAt",
        "readingTime",
        "author",
        "publishedAtFormatted",
      ]),
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    );
  return (
    <section>
      <h2 className="mb-2 text-base font-bold md:text-2xl">Blog</h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        Geschichten und Neuigkeiten rund um die Makers League
      </p>
      <div className="space-y-24">
        {posts.map((post) => (
          <article key={post._id}>
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
            <Button
              href={`/einblicke/${post.slug}`}
              color="sand"
              variant="outline"
              size="small"
            >
              <Arrow className="text-2xl" />
              Weiterlesen...
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};
