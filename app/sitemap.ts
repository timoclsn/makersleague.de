import { allBlogPosts } from "contentlayer/generated";
import { getMemberInfosCached } from "lib/easyverein";

const sitemap = async () => {
  const origin = "https://makersleague.de";
  const buildUrl = (path: string) => `${origin}${path}`;

  const pages = [
    "/",
    "/ueber",
    "/events",
    "/mitglied-werden",
    "/blog",
    "/mitglieder",
    "/faqs",
    "/impressum",
    "/datenschutzerklaerung",
  ];

  allBlogPosts.forEach((blogPost) => {
    pages.push(`/blog/${blogPost.slug}`);
  });

  const allMembers = await getMemberInfosCached();

  allMembers.forEach((member) => {
    pages.push(`/mitglieder/${member.slug}`);
  });

  return pages.map((page) => ({
    url: buildUrl(page),
    lastModified: new Date(),
  }));
};

export default sitemap;
