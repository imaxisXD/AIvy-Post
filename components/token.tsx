import { InfoIcon } from "lucide-react";
import { Progress } from "./ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { abbreviateNumber } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Token() {
  const userCreditToken = useQuery(api.users.getUserCreditToken);

  useEffect(() => {
    if (userCreditToken != null && userCreditToken <= 0) {
      console.log("userCreditToken", userCreditToken);
      toast.error("You don't have enough tokens to post");
      return;
    }
  }, [userCreditToken]);

  if (userCreditToken == null) {
    return null;
  }

  const formatedCreditToken = abbreviateNumber(userCreditToken);

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="h-5 w-5 fill-purple-200 text-purple-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-bold text-sm">Tokens</h1>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-3 w-3 fill-purple-100" />
                </TooltipTrigger>
                <TooltipContent className="mb-1 ml-3 border border-purple-300">
                  <p>
                    Tokens are used to pay <br /> for your generated content.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <span className="font-urban text-sm font-medium">
          {formatedCreditToken} / 10K
        </span>
      </div>
      <Progress
        value={userCreditToken}
        max={10000}
        className="mt-2 h-1.5 border border-purple-500"
      />
    </div>
  );
}
