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

export default function Token() {
  const userCreditToken = useQuery(api.users.getUserCreditToken);
  if (userCreditToken == null) {
    return null;
  }
  const formatedCreditToken = abbreviateNumber(userCreditToken);

  return (
    <div>
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-5 h-5 text-purple-700 fill-purple-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-sm text-bold">Tokens</h1>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-3 w-3 fill-purple-100" />
                </TooltipTrigger>
                <TooltipContent className="border border-purple-300 ml-3 mb-1">
                  <p>
                    Tokens are used to pay <br /> for your generated content.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <span className="text-sm font-urban font-medium">
          {formatedCreditToken} / 10K
        </span>
      </div>
      <Progress
        value={userCreditToken}
        max={10000}
        className="h-1.5 mt-2 border border-purple-500"
      />
    </div>
  );
}
