import { cx } from "cva";
import { components } from "lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  children: string;
  className?: string;
}

export const Mdx = ({ children, className }: Props) => {
  return (
    <div className={cx("prose", className)}>
      <MDXRemote source={children} components={components} />
    </div>
  );
};
