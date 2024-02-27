"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useConvexAuth, useQuery } from "convex/react";
import { Puzzle, Settings2, Square } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

function CampaignNavList() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  console.log("User", user);
  console.log("Auth", isAuthenticated);
  const CampaignArray = useQuery(api.campaign.getCurrentUserActiveCampaigns);
  const segments = useSelectedLayoutSegments();
  console.log(segments);

  if (CampaignArray)
    return (
      <Accordion type="single" collapsible>
        {CampaignArray?.length > 0 &&
          CampaignArray?.map((campaign) => (
            <AccordionItem key={campaign?._id} value={campaign?.name!}>
              <AccordionTrigger>
                <span className="flex items-center justify-center gap-3">
                  <Square
                    width={15}
                    strokeWidth={1.7}
                    className="fill-current text-purple-200 stroke-purple-500 "
                  />
                  {campaign?.name}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 items-start justify-center pl-5 text-sm font-medium">
                <Link
                  className="flex items-center justify-start gap-2 text-sm w-full px-2 py-1 rounded-md hover:bg-purple-200 transition-all duration-150 ease-in-out"
                  href={`/dashboard/campaign/${campaign?.name}-${campaign?.campaignId}/create`}
                >
                  <Puzzle width={18} strokeWidth={1.7} />
                  Create
                </Link>
                <Link
                  className="flex items-center justify-start gap-2 text-sm w-full px-2 py-1 rounded-md hover:bg-purple-200 transition-all duration-150 ease-in-out"
                  href={`/dashboard/campaign/${campaign?.name}-${campaign?.campaignId}/setup`}
                >
                  <Settings2 width={18} strokeWidth={1.7} />
                  Setup
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    );
}

export { CampaignNavList };
