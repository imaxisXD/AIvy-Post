"use client";
import Link from "next/link";
import { LayoutDashboard, ListPlusIcon, Menu, Settings } from "lucide-react";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

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
      href: "http://localhost:3000/dashboard/create",
      isActive: segments[0] === "create",
      icon: <ListPlusIcon width={18} />,
    },
    {
      name: "Settings",
      href: "http://localhost:3000/dashboard/settings",
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
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0`}
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
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive
                    ? "border-stone-200 border-b text-black bg-stone-300"
                    : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 `}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="my-2 border-t border-stone-200 " />
          {children}
        </div>
      </div>
    </nav>
  );
}
