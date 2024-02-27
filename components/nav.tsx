"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  ListPlusIcon,
  Menu,
  Settings,
  SquarePen,
} from "lucide-react";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { CampaignNavList } from "./campaign-nav-list";

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const tabs = [
    {
      name: "Home",
      href: "/",
      isActive: segments.length === 0,
      icon: <LayoutDashboard width={18} />,
    },
    {
      name: "Create",
      href: "/dashboard/create",
      isActive: segments[0] === "create",
      icon: <ListPlusIcon width={18} />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      isActive: segments[0] === "settings",
      icon: <Settings width={18} />,
    },
  ];

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <nav className="text-black">
      <button
        className="fixed z-20 right-5 top-7 sm:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <a
              href="https://vercel.com/templates/next.js/platforms-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 hover:bg-stone-200 
              "
            >
              <svg
                width="26"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black "
              >
                <path
                  d="M37.5274 0L75.0548 65H0L37.5274 0Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <div className="h-6 rotate-[30deg] border-l border-stone-400 " />
            <Link href="/" className="rounded-lg p-2 hover:bg-stone-200 ">
              <Image
                src="/logo.png"
                width={24}
                height={24}
                alt="Logo"
                className=""
              />
            </Link>
          </div>
          <div className="grid gap-1">
            <Link
              scroll={true}
              key={"campaign"}
              href="/dashboard/campaign"
              className="group border-[#e698ff] font-medium text-purple-900 background-animate border-opacity-80 bg-gradient-to-r from-[#FDCBF1] to-[#E0D1F7] border flex items-center space-x-3 rounded-md px-2 py-1.5 transition-all duration-150 ease-in-out shadow-[#e598ff7b] shadow-inner drop-shadow-md hover:bg-gradient-to-t hover:font-semibold active:font-extrabold"
            >
              <SquarePen width={18} strokeWidth={2} />
              <span className="text-sm font-urban tracking-wide drop-shadow-md shadow-purple-950">
                New Campaign
              </span>
            </Link>
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                scroll={true}
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive
                    ? "border-[#e698ff] border-b text-purple-700 bg-white "
                    : "text-stone-600 hover:text-black hover:bg-stone-200"
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
          <Separator className="" />
          <span className="text-xs text-stone-500 pl-2 pt-2 flex items-center justify-start gap-3">
            CAMPAIGNS
          </span>
          <CampaignNavList />
        </div>
        <div>
          <div className="my-2 border-t border-stone-200" />
          <h1>Hellllllllloooooo</h1>
          {children}
        </div>
      </div>
    </nav>
  );
}
