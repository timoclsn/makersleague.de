import { Arrow, Calendar, Profile, Watch } from "components/icons";
import { getAllBlogPosts } from "lib/content";
import { Button } from "./Button";

export const BlogSection = async () => {
  const allBlogPosts = await getAllBlogPosts();
  const posts = allBlogPosts.sort(
    (a, b) =>
      Number(new Date(b.data.publishedAt)) -
      Number(new Date(a.data.publishedAt)),
  );
  return (
    <section>
      <h2 className="mb-2 text-base font-bold md:text-2xl">Blog</h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        Geschichten und Neuigkeiten rund um die Makers League
      </p>
      <div className="space-y-24">
        {posts.map(({ name, data }) => (
          <article key={name}>
            <h2 className="mb-2 text-base font-bold md:text-2xl">
              {data.title}
            </h2>
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
            <Button
              href={`/einblicke/${name}`}
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
