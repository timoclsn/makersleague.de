import { defineDocumentType, makeSource } from 'contentlayer/source-files';
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

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, ContentPage],
});
