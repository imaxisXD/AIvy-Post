"use client";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function CampaignProgress() {
  const pathname = usePathname();
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (pathname.includes("dashboard/campaign")) {
      setProgressValue(0); // Set to 50% for dashboard path
    } else if (pathname.includes("dashboard/campaign/step1")) {
      setProgressValue(33); // Set to 75% for settings path
    } else {
      setProgressValue(100); // Default to 100%
    }
  }, [pathname]);

  return <Progress className="w-52 h-1.5" value={progressValue} />;
}

export { CampaignProgress };
