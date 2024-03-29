import { IconProps } from ".";

export const Check = ({ className, width = 24, height = 24 }: IconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 19C8.13402 19 5.00001 15.866 5.00001 12C5.00001 8.13401 8.13402 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19ZM8.70713 11.7929L10.5 13.5858L15.2929 8.79289C15.6834 8.40237 16.3166 8.40237 16.7071 8.79289C17.0976 9.18342 17.0976 9.81658 16.7071 10.2071L11.2071 15.7071C10.8166 16.0976 10.1834 16.0976 9.79291 15.7071L7.29291 13.2071C6.90239 12.8166 6.90239 12.1834 7.29291 11.7929C7.68344 11.4024 8.3166 11.4024 8.70713 11.7929Z"
        fill="currentColor"
      />
    </svg>
  );
};
