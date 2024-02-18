import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { readFile, readdir } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import path from "path";
import readingTime from "reading-time";
import { z } from "zod";

const frontmatteSchemas = {
  page: z.object({
    title: z.string(),
  }),
  faq: z.object({
    question: z.string(),
    preview: z.boolean(),
  }),
  blog: z.object({
    title: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    author: z.string(),
  }),
};

type ContentType = keyof typeof frontmatteSchemas;

export const getContent = async <Type extends ContentType>(options: {
  type: Type;
  name: string;
}) => {
  const { type, name } = options;

  const filePath = path.join(
    process.cwd(),
    "public",
    "content",
    type,
    `${name}.md`,
  );
  const file = await readFile(filePath, "utf8");

  const { content, frontmatter } = await compileMDX({
    source: file,
    components: {
      a: ({ children, href }) => {
        return <Link href={href ?? ""}>{children}</Link>;
      },
    },
    options: { parseFrontmatter: true },
  });

  const parsedFrontmatter = frontmatteSchemas[type].parse(
    frontmatter,
  ) as z.output<(typeof frontmatteSchemas)[Type]>;

  return {
    name,
    data: parsedFrontmatter,
    content,
    raw: file,
  };
};

export const getAllContent = async <Type extends ContentType>(type: Type) => {
  const dirPath = path.join(process.cwd(), "public", "content", type);
  const fileNames = await readdir(dirPath);
  return await Promise.all(
    fileNames.map(async (fileName) => {
      const name = fileName.replace(/\.md$/, "");
      return await getContent({ type, name });
    }),
  );
};

// Page

export const getPage = async (name: string) => {
  return await getContent({ type: "page", name });
};

// FAQ

export type Faq = Awaited<ReturnType<typeof getFaq>>;

export const getFaq = async (name: string) => {
  return await getContent({ type: "faq", name });
};

export const getAllFaqs = async () => {
  return await getAllContent("faq");
};

export const getPreviewFaqs = async () => {
  const allFaqs = await getAllFaqs();
  return allFaqs.filter((faq) => faq.data.preview);
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
  const content = await getContent({ type: "blog", name });
  return enhanceBlog(content);
};

export const getAllBlogPosts = async () => {
  const allBlogPosts = await getAllContent("blog");
  return allBlogPosts.map(enhanceBlog);
};
