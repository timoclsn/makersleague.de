import { IconProps } from ".";

export const Heart = ({ className, width = 24, height = 24 }: IconProps) => {
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
        d="M20.16 5.00001C19.1 3.93722 17.6948 3.28855 16.1983 3.17118C14.7019 3.05381 13.2128 3.47548 12 4.36001C10.7277 3.41365 9.14399 2.98452 7.56792 3.15905C5.99185 3.33358 4.54044 4.09879 3.50597 5.3006C2.47151 6.5024 1.93082 8.05153 1.9928 9.63603C2.05478 11.2205 2.71482 12.7227 3.84 13.84L10.05 20.06C10.57 20.5718 11.2704 20.8586 12 20.8586C12.7296 20.8586 13.43 20.5718 13.95 20.06L20.16 13.84C21.3276 12.6653 21.9829 11.0763 21.9829 9.42001C21.9829 7.76374 21.3276 6.17475 20.16 5.00001ZM18.75 12.46L12.54 18.67C12.4693 18.7414 12.3852 18.798 12.2925 18.8367C12.1999 18.8753 12.1004 18.8952 12 18.8952C11.8996 18.8952 11.8001 18.8753 11.7075 18.8367C11.6148 18.798 11.5307 18.7414 11.46 18.67L5.25 12.43C4.46576 11.6284 4.02661 10.5515 4.02661 9.43001C4.02661 8.30855 4.46576 7.23167 5.25 6.43001C6.04916 5.641 7.12697 5.19858 8.25 5.19858C9.37303 5.19858 10.4508 5.641 11.25 6.43001C11.343 6.52374 11.4536 6.59814 11.5754 6.6489C11.6973 6.69967 11.828 6.72581 11.96 6.72581C12.092 6.72581 12.2227 6.69967 12.3446 6.6489C12.4664 6.59814 12.577 6.52374 12.67 6.43001C13.4692 5.641 14.547 5.19858 15.67 5.19858C16.793 5.19858 17.8708 5.641 18.67 6.43001C19.465 7.22116 19.9186 8.2922 19.9335 9.4137C19.9485 10.5352 19.5236 11.6179 18.75 12.43V12.46Z"
        fill="currentColor"
      />
    </svg>
  );
};
