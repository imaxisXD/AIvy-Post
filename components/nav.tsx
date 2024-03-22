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
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { CampaignNavList } from "./campaign-nav-list";
import Token from "./token";
import AppLogo from "./logo";

export default function Nav() {
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
        className="fixed right-5 top-7 z-20 sm:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-1">
          <div className="flex items-center space-x-1 rounded-lg px-1 py-1.5">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg p-1 hover:bg-purple-100 
              "
            >
              <AppLogo />
              <Separator className="h-0.5 w-7 -rotate-[70deg] bg-black" />
              <h1 className="font-satoshi text-xl font-extrabold text-theme-primary">
                LinkedInFy
              </h1>
            </Link>
          </div>
          <div className="grid gap-1">
            <Link
              scroll={true}
              key={"campaign"}
              href="/dashboard/campaign"
              className="background-animate group flex items-center space-x-3 rounded-md border border-[#e698ff] border-opacity-80 bg-gradient-to-r from-[#FDCBF1] to-[#E0D1F7] px-2 py-1.5 font-medium text-purple-900 shadow-inner shadow-[#e598ff7b] drop-shadow-md transition-all duration-150 ease-in-out hover:bg-gradient-to-t hover:font-semibold active:font-extrabold"
            >
              <SquarePen width={18} strokeWidth={2} />
              <span className="font-urban text-sm tracking-wide shadow-purple-950 drop-shadow-md">
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
                    ? "border-b border-[#e698ff] bg-white text-purple-700 "
                    : "text-stone-600 hover:bg-stone-200 hover:text-black"
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
          <Separator className="" />
          <span className="flex items-center justify-start gap-3 pl-2 pt-2 text-xs text-stone-500">
            CAMPAIGNS
          </span>
          <CampaignNavList />
        </div>
        <Token />
      </div>
    </nav>
  );
}
