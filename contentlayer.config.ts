import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import readingTime from "reading-time";
import { format, parseISO, parse, formatISO } from "date-fns";
// @ts-ignore
import { de } from "date-fns/locale/index.js"; // ESM import not working in node

const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: "blog/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    summary: { type: "string", required: true },
    author: { type: "string", required: true },
  },
  computedFields: {
    readingTime: {
      type: "string",
      resolve: (doc) => `${Math.ceil(readingTime(doc.body.raw).minutes)} min`,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    publishedAtFormatted: {
      type: "string",
      resolve: (doc) =>
        format(parseISO(doc.publishedAt), "dd. MMM yyyy", {
          locale: de,
        }),
    },
  },
}));

const ContentPage = defineDocumentType(() => ({
  name: "ContentPage",
  filePathPattern: "content-pages/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
  },
}));

const Faq = defineDocumentType(() => ({
  name: "Faq",
  filePathPattern: "faqs/*.md",
  contentType: "markdown",
  fields: {
    question: { type: "string", required: true },
    preview: { type: "boolean", required: true },
  },
}));

const Cta = defineNestedType(() => ({
  name: "CTA",
  fields: {
    text: { type: "string", required: true },
    link: { type: "string", required: true },
  },
}));

const Event = defineDocumentType(() => ({
  name: "Event",
  filePathPattern: "events/*.md",
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    subtitle: { type: "string", required: true },
    location: { type: "string", required: true },
    startTime: { type: "string", required: true },
    endTime: { type: "string", required: true },
    customDate: { type: "string", required: false },
    scale: { type: "string", required: true },
    cta: {
      type: "nested",
      of: Cta,
    },
  },
  computedFields: {
    dateFormatted: {
      type: "string",
      resolve: (doc) => {
        if (doc.customDate) {
          return doc.customDate;
        }
        return format(parse(doc.startTime, "Pp", new Date()), "dd. MMM yyyy", {
          locale: de,
        });
      },
    },
    timeFormatted: {
      type: "string",
      resolve: (doc) => {
        const timeFormat = doc.customDate ? "HH:mm" : "Pp";
        const start = format(
          parse(doc.startTime, timeFormat, new Date()),
          "HH",
        );
        const end = format(parse(doc.endTime, timeFormat, new Date()), "HH");
        return `${start} – ${end} Uhr`;
      },
    },
    startIso: {
      type: "string",
      resolve: (doc) => {
        try {
          return formatISO(parse(doc.startTime, "Pp", new Date()));
        } catch (e) {
          return "";
        }
      },
    },
    endIso: {
      type: "string",
      resolve: (doc) => {
        try {
          return formatISO(parse(doc.endTime, "Pp", new Date()));
        } catch (e) {
          return "";
        }
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost, ContentPage, Faq, Event],
});
