export const htmlToString = (html: string) => {
  return html.replace(/<[^>]*>?/gm, "");
};
