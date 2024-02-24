"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
import { colorMap } from "./utils";

interface NavItemProps {
  title: string;
  subtitle?: string;
  color?: keyof typeof colorMap;
  Icon: Icon | LucideIcon;
  href: string;
  onclick?: () => void;
}

export const NavItem = ({
  title,
  subtitle,
  color = "blue",
  Icon,
  href,
  onclick,
}: NavItemProps) => {
  const pathname = usePathname();
  return (
    <li
      className={`group w-1/2 lg:h-1/2 ${colorMap[color].bg} ${colorMap[color].text}`}
    >
      <Link href={href} onClick={onclick}>
        <div className="flex h-full w-full flex-col justify-between gap-12 p-6">
          <Icon className={`${colorMap[color].text} text-[24px]`} />
          <div className="lg:writing-vertical flex flex-col group-hover:opacity-80">
            <p
              className={`text-2lg font-bold${
                pathname?.includes(href) && " underline"
              }`}
            >
              {title}
            </p>
            {subtitle && (
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
