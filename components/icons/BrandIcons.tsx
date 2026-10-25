import { SVGProps } from "react";

// Lucide v1 dropped brand icons; these copy the v0 Lucide paths (ISC license)
const LucideBrandIcon = ({
  className,
  children,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const InstagramOutline = (props: SVGProps<SVGSVGElement>) => (
  <LucideBrandIcon {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </LucideBrandIcon>
);

export const Linkedin = (props: SVGProps<SVGSVGElement>) => (
  <LucideBrandIcon {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </LucideBrandIcon>
);
