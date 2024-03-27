"use client";
import { useSelectedLayoutSegments } from "next/navigation";
import HomeSVG from "./icon/home";

export default function CampaignBreadCrumbs() {
  const pathname = useSelectedLayoutSegments();
  console.log("pathname", pathname);
  if (pathname[0] === "campaign" && pathname[1]) {
    return (
      <div className="ml-4 flex items-center justify-center gap-1 text-gray-600">
        <HomeSVG className="h-4 w-4" />
        <h1>/ Campaign /</h1>
        <h1> {pathname[1]?.split("-")[0]}</h1>
      </div>
    );
  } else {
    return <div></div>;
  }
}
