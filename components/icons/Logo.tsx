import { IconProps } from ".";

export const Logo = ({ className, width = 24, height = 24 }: IconProps) => {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 228 284"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M112.263 284V283.822C113.004 283.837 113.75 283.845 114.499 283.845C115.544 283.845 116.58 283.829 117.608 283.802L117.61 283.802C118.74 283.771 119.857 283.72 120.959 283.657C180.545 280.281 228 230.546 228 169.857V0H120.734V0.103574H0.99646V169.961C0.99646 230.65 48.452 280.384 108.038 283.761L112.263 284ZM207.529 169.857C207.529 217.879 171.237 257.568 124.734 262.701V20.5752H207.529V169.857ZM21.4674 169.961C21.4674 217.982 57.7599 257.671 104.263 262.804V20.6787H21.4674V169.961Z"
        fill="currentColor"
      />
    </svg>
  );
};
