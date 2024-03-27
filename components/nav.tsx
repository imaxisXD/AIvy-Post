"use client";
import Link from "next/link";
import { ListPlusIcon, Menu, Settings } from "lucide-react";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { CampaignNavList } from "./campaign-nav-list";
import Token from "./token";
import AppLogo from "./logo";
import HomeSVG from "./icon/home";

export default function Nav() {
  const segments = useSelectedLayoutSegments();
  const tabs = [
    {
      name: "Home",
      href: "/dashboard/home",
      isActive: segments[0] === "home",
      icon: <HomeSVG className="h-6 w-5" />,
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
    setShowSidebar(false);
  }, [pathname]);

  return (
    <nav className="text-black shadow-inner">
      <button
        className="fixed right-5 top-7 z-20 sm:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between bg-stone-100 p-4 shadow-inner transition-all sm:w-60 sm:translate-x-0`}
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
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                scroll={true}
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive
                    ? "border-b border-[#e698ff] bg-white fill-purple-400 text-purple-700"
                    : "text-stone-600 hover:bg-stone-200 hover:text-black"
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
          <span className="flex items-center justify-start gap-3 pl-2 pt-2 text-xs -tracking-tight text-stone-500">
            CAMPAIGNS
          </span>
          <CampaignNavList />
        </div>
        <Token />
      </div>
    </nav>
  );
}
