import { getAllBlogPosts } from "lib/content";
import { getWebsiteMembers } from "lib/members";

const sitemap = async () => {
  const origin = "https://makersleague.de";
  const buildUrl = (path: string) => `${origin}${path}`;

  const pages = [
    "/",
    "/ueber",
    "/events",
    "/mitglied-werden",
    "/mitglied-werden/bewerbung",
    "/einblicke",
    "/mitglieder",
    "/faqs",
    "/impressum",
    "/datenschutzerklaerung",
  ];

  const allBlogPosts = await getAllBlogPosts();

  allBlogPosts.forEach((blogPost) => {
    pages.push(`/einblicke/${blogPost.name}`);
  });

  const allMembers = await getWebsiteMembers();

  allMembers.forEach((member) => {
    pages.push(`/mitglieder/${member.slug}`);
  });

  return pages.map((page) => ({
    url: buildUrl(page),
    lastModified: new Date(),
  }));
};

export default sitemap;
