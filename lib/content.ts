import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import readingTime from "reading-time";
import { z } from "zod";
import { components } from "./mdx";

// Bundled at build time, so no filesystem access (and no tracing of the
// whole project into every function). Raw text via the turbopack rule in next.config.ts
// (`import: "default"` returns undefined in eager mode in Next 16.4, so map it here)
const contentFiles = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: string }>(
      ["/content/**/*.md", "/content/**/*.mdx"],
      { query: "?raw", eager: true },
    ),
  ).map(([filePath, module]) => [filePath, module.default]),
);

// "/content/<type>/<name>/<file>.mdx" -> { type, name }
const parseContentPath = (filePath: string) => {
  const [, , type, name] = filePath.split("/");
  return { type, name };
};

const faqTags = z.enum(["general", "makers-inn"]);
type FaqTag = z.infer<typeof faqTags>;

const frontmatterSchemas = {
  page: z.object({
    title: z.string(),
  }),
  faq: z.object({
    question: z.string(),
    tags: z.array(faqTags),
  }),
  blog: z.object({
    title: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    author: z.string(),
  }),
  testimonial: z.object({
    name: z.string(),
    date: z.string(),
  }),
};

type ContentType = keyof typeof frontmatterSchemas;

/**
 * Retrieves content of a specific type and name.
 * @param type The type of content.
 * @param name The name of the content.
 * @returns An object containing the name, parsed frontmatter, content, and raw file data.
 * @throws Error if no content file is found for the specified type and name.
 */

const getContent = async <Type extends ContentType>(
  type: Type,
  name: string,
) => {
  const dirName = name;

  // Get content file
  const file = Object.entries(contentFiles).find(([filePath]) => {
    const content = parseContentPath(filePath);
    return content.type === type && content.name === dirName;
  })?.[1];
  if (file === undefined) {
    throw new Error(`No content file found for ${type}/${dirName}`);
  }

  // Compile MDX
  const { content, frontmatter } = await compileMDX({
    source: file,
    components,
    options: { parseFrontmatter: true },
  });

  // Parse frontmatter
  const parsedFrontmatter = frontmatterSchemas[type].parse(
    frontmatter,
  ) as z.output<(typeof frontmatterSchemas)[Type]>;

  return {
    name: dirName,
    data: parsedFrontmatter,
    content,
    raw: file,
  };
};

/**
 * Retrieves all content of a specific type.
 *
 * @param type The type of content to retrieve.
 * @returns A promise that resolves to an array of content items.
 */

const getAllContent = async <Type extends ContentType>(type: Type) => {
  // Get content names
  const dirNames = Object.keys(contentFiles)
    .map(parseContentPath)
    .filter((content) => content.type === type)
    .map((content) => content.name);

  return await Promise.all(
    dirNames.map(async (name) => {
      return await getContent(type, name);
    }),
  );
};

const getContentCached = cache(getContent);
const getAllContentCached = cache(getAllContent);

export { getAllContentCached as getAllContent, getContentCached as getContent };

// Page

export const getPage = async (name: string) => {
  return await getContent("page", name);
};

// FAQ

export type Faq = Awaited<ReturnType<typeof getFaq>>;

export const getFaq = async (name: string) => {
  return await getContent("faq", name);
};

export const getAllFaqs = async () => {
  return await getAllContent("faq");
};

export const getFaqsByTags = async (tags: Array<FaqTag>) => {
  const allFaqs = await getAllFaqs();
  return allFaqs.filter((faq) =>
    faq.data.tags.some((tag) => tags.includes(tag)),
  );
};

// Blog

type BasicBlog = Awaited<ReturnType<typeof getContent<"blog">>>;

const enhanceBlog = (blog: BasicBlog) => {
  return {
    ...blog,
    data: {
      ...blog.data,
      readingTime: `${Math.ceil(readingTime(blog.raw).minutes)} min`,
      publishedAtFormatted: format(
        parseISO(blog.data.publishedAt),
        "dd. MMM yyyy",
        {
          locale: de,
        },
      ),
    },
  };
};

export const getBlog = async (name: string) => {
  const content = await getContent("blog", name);
  return enhanceBlog(content);
};

export const getAllBlogPosts = async () => {
  const allBlogPosts = await getAllContent("blog");
  return allBlogPosts.map(enhanceBlog);
};

// Testimonials

export const getAllTestimonials = async () => {
  const testimonials = await getAllContent("testimonial");
  return testimonials.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
};
