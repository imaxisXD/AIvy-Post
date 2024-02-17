"use client";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function CampaignProgress() {
  const pathname = usePathname();
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (pathname === "/dashboard/campaign") {
      return;
    } else if (pathname === "/dashboard/campaign/new") {
      setProgressValue(33); // Set to 75% for settings path
    } else {
      setProgressValue(100); // Default to 100%
    }
  }, [pathname]);

  if (pathname === "/dashboard/campaign") {
    return null;
  }

  return <Progress className="w-3/5 h-1.5" value={progressValue} />;
}

export { CampaignProgress };
