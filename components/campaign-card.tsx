import { Id } from "@/convex/_generated/dataModel";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export type campaign = {
  _id: Id<"campaigns">;
  _creationTime: number;
  userId: Id<"users">;
  name: string;
  startDate: string;
  endDate: string;
  postingTime: string;
  timezone: string;
  utc_postingTime: string;
  campaignId: string;
  campaignIsActive: string;
};
type CampaignCardProps = {
  campaign: campaign;
};

function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Link
      href={`/dashboard/campaign/${campaign?.name}-${campaign?.campaignId}/create`}
      className="h-56 relative border bg-opacity-80 hover:bg-opacity-100 flex flex-col items-center justify-center max-w-1/2 min-w-60 border-[#71c19a] rounded-2xl bg-gradient-to-b from-[#e6f9ee] to-[#feffff] text-black shadow-lg shadow-emerald-500/10 hover:shadow-lg cursor-pointer trandition-all duration-200 ease-in-out"
      key={campaign?._id}
      scroll={true}
    >
      <div className="bg-white absolute right-2 top-2 border border-emerald-500 px-5 py-0.5 text-xs rounded-full flex itme-center justify-center gap-2">
        <span className="relative flex h-2 w-2 pt-[2.8px]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span>Active</span>
      </div>
      <h1 className="font-urban drop-shadow-sm text-black font-bold text-xl pt-10 pb-7 flex item-center justify-center gap-1">
        {campaign?.name}
        <ExternalLink width={15} strokeWidth={2.5} />
      </h1>
      <p className="text-sm mb-1  text-[#499772] bg-[#f4faf8] py-1 px-3 w-[70%] rounded-lg flex items-center justify-around gap-2">
        <strong className="text-[#43956e] drop-shadow-sm">Start:</strong>{" "}
        {campaign?.startDate}
      </p>
      <p className="text-sm text-[#499772] bg-[#f4faf8] py-1 px-3 w-[70%] rounded-lg flex items-center justify-around gap-2">
        <strong className="text-[#43956e] drop-shadow-sm">End:</strong>{" "}
        {campaign?.endDate}
      </p>
    </Link>
  );
}

export default CampaignCard;
