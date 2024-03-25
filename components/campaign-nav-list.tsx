"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Puzzle, Settings2, Square } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

function CampaignNavList() {
  const CampaignArray = useQuery(api.campaign.getCurrentUserActiveCampaigns);
  const segments = useSelectedLayoutSegments();

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
                    className="fill-current stroke-purple-500 text-purple-200 "
                  />
                  {campaign?.name}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-start justify-center gap-1 pl-5 text-sm font-medium">
                <Link
                  className={`${
                    segments[2] === "create" &&
                    segments[1] === `${campaign?.name}-${campaign?.campaignId}`
                      ? "border-b border-[#e698ff] bg-purple-100 text-purple-600"
                      : "hover:bg-purple-200"
                  } flex w-full items-center justify-start gap-2 rounded-md px-2 py-1 text-sm transition-all duration-150 ease-in-out`}
                  href={`/dashboard/campaign/${campaign?.name}-${campaign?.campaignId}/create`}
                >
                  <Puzzle width={18} strokeWidth={1.7} />
                  Create
                </Link>
                <Link
                  className={`${
                    segments[2] === "setup" &&
                    segments[1] === `${campaign?.name}-${campaign?.campaignId}`
                      ? "border-b border-[#e698ff] bg-purple-100 text-purple-600"
                      : "hover:bg-purple-200"
                  } flex w-full items-center justify-start gap-2 rounded-md px-2 py-1 text-sm transition-all duration-300 ease-in-out`}
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
