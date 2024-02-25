import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

type Components = Parameters<typeof compileMDX>[0]["components"];

export const components: Components = {
  a: ({ children, href }) => {
    return <Link href={href ?? ""}>{children}</Link>;
  },
};
