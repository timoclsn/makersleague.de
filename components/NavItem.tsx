'use client';

import Link from 'next/link';

import { Icon } from 'icons';
import { usePathname } from 'next/navigation';
import { colorMap } from './utils';

interface NavItemProps {
  title: string;
  subtitle: string;
  color?: keyof typeof colorMap;
  Icon: Icon;
  expanded?: boolean;
  href: string;
}

export const NavItem = ({
  title,
  subtitle,
  color = 'blue',
  Icon,
  expanded,
  href,
}: NavItemProps) => {
  const pathname = usePathname();
  return (
    <li
      className={`w-1/2 xl:h-1/2 group ${colorMap[color].bg} ${colorMap[color].text}`}
    >
      <Link href={href}>
        <div className="h-full w-full gap-12 p-6 flex flex-col justify-between">
          <Icon className={`${colorMap[color].text} text-[24px]`} />
          <div
            className={`flex group-hover:opacity-80 ${
              expanded ? 'flex-col-reverse' : 'xl:writing-vertical flex-col'
            }`}
          >
            <p
              className={`text-2lg font-bold${
                pathname?.includes(href) && ' underline'
              }`}
            >
              {title}
            </p>
            {expanded && (
              <span className="mb-4 text-sm opacity-80 md:text-base">
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};
