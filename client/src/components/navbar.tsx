"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navlinks } from "@/constants";
import { useConnectWalletModal } from "@/hooks/use-connect-wallet-modal";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const { open } = useConnectWalletModal();
  const { isConnected } = useAccount();

  const isLinkActive = (link: string): boolean => {
    if (link === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(link) || false;
  };

  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <nav className="flex flex-col-reverse md:flex-row justify-between gap-6 mb-8">
      {/* Search Bar */}
      <div className="flex flex-row items-center max-w-[458px] w-full bg-[#1c1c24] rounded-full h-[52px] px-4 py-2">
        <Input
          type="text"
          placeholder="Search for campaigns"
          className="flex-grow text-sm font-normal font-epilogue text-white placeholder:text-[#4b5264] bg-transparent border-none outline-none focus:border-none focus:outline-none"
        />

        <Button
          className="flex items-center justify-center w-[72px] h-full bg-[#4acd8d] rounded-[20px] cursor-pointer hover:bg-[#3da974] transition"
          aria-label="Search"
        >
          <Image
            src="/assets/search.svg"
            alt="Search icon"
            width={15}
            height={15}
            className="object-contain"
          />
        </Button>
      </div>

      {/* Large screen navigation */}
      <div className="sm:flex hidden flex-row justify-end items-center gap-4">
        <Button
          title={isConnected ? "Create a campaign" : "Connect"}
          className={cn(
            "px-4 py-2 rounded-full font-medium text-white",
            isConnected ? "bg-[#1dc071]" : "bg-[#8c6dfd]"
          )}
          onClick={() => {
            if (isConnected) redirect("/create-campaign");
            else open();
          }}
        >
          {isConnected ? "Create a campaign" : "Connect"}
        </Button>

        <Link href="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <Image
              src="/assets/thirdweb.png"
              alt="thirdweb"
              width={31}
              height={31}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <Image
            src="/assets/logo.svg"
            alt="user"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>

        <Image
          src="/assets/menu.svg"
          alt="menu"
          width={34}
          height={34}
          className="object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex items-center p-4 ${
                  isLinkActive(link.link) && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setToggleDrawer(false);
                  redirect(link.link);
                }}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.name}
                  width={24}
                  height={24}
                  className={`object-contain ${
                    isLinkActive(link.link) ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isLinkActive(link.link)
                      ? "text-[#1dc071]"
                      : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mx-4">
            <Button
              className={cn(
                "w-full py-2 rounded-full text-white text-center",
                isConnected ? "bg-[#1dc071]" : "bg-[#8c6dfd]"
              )}
              onClick={() => {
                if (isConnected) redirect("/create-campaign");
                else open();
              }}
            >
              {isConnected ? "Create a campaign" : "Connect"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
