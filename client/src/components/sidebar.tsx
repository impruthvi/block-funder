"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navlinks } from "@/constants";
import { Icon } from "./icon";

// Types
interface NavLink {
  name: string;
  imgUrl: string;
  link: string;
  disabled?: boolean;
}

export const Sidebar = () => {
  const pathname = usePathname();

  const isLinkActive = (link: string): boolean => {
    if (link === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(link) || false;
  };

  const renderNavLinks = () => (
    <div className="flex flex-col justify-center items-center gap-3">
      {navlinks.map((link: NavLink) => (
        <Link
          href={link.disabled ? "#" : link.link}
          key={link.name}
          onClick={(e) => {
            if (link.disabled) {
              e.preventDefault();
            }
          }}
          aria-disabled={link.disabled}
          className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-[10px]"
        >
          <Icon {...link} styles="" isActive={isLinkActive(link.link)} />
        </Link>
      ))}
    </div>
  );

  return (
    <aside className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link
        href="/"
        className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-[10px]"
      >
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          imgUrl="/assets/logo.svg"
          isActive={false}
          name="logo"
        />
      </Link>

      <nav className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        {renderNavLinks()}

        <Icon
          styles="bg-[#1c1c24] shadow-secondary hover:bg-[#2c2f32]"
          imgUrl="/assets/sun.svg"
          name="theme-toggle"
          isActive={false}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
