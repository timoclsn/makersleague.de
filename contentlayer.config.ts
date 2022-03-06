import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import { format, parseISO } from 'date-fns';
// @ts-ignore
import { de } from 'date-fns/locale/index.js'; // ESM import not working in node

const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    summary: { type: 'string', required: true },
    author: { type: 'string', required: true },
  },
  computedFields: {
    readingTime: {
      type: 'string',
      resolve: (doc) => `${Math.ceil(readingTime(doc.body.raw).minutes)} min`,
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    publishedAtFormatted: {
      type: 'string',
      resolve: (doc) =>
        format(parseISO(doc.publishedAt), 'dd. MMM yyyy', {
          locale: de,
        }),
    },
  },
}));

const ContentPage = defineDocumentType(() => ({
  name: 'ContentPage',
  filePathPattern: 'content-pages/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
  },
}));

const Faq = defineDocumentType(() => ({
  name: 'Faq',
  filePathPattern: 'faqs/*.md',
  contentType: 'markdown',
  fields: {
    question: { type: 'string', required: true },
  },
}));

const Cta = defineNestedType(() => ({
  name: 'CTA',
  fields: {
    text: { type: 'string', required: true },
    link: { type: 'string', required: true },
  },
}));

const Event = defineDocumentType(() => ({
  name: 'Event',
  filePathPattern: 'events/*.md',
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    location: { type: 'string', required: true },
    date: { type: 'string', required: true },
    time: { type: 'string', required: true },
    scale: { type: 'string', required: true },
    cta: {
      type: 'nested',
      of: Cta,
    },
  },
  computedFields: {
    dateFormatted: {
      type: 'string',
      resolve: (doc) => {
        try {
          return format(parseISO(doc.date), 'dd. MMM yyyy', {
            locale: de,
          });
        } catch (e) {
          return doc.date;
        }
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, ContentPage, Faq, Event],
});
