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
      className="h-56 relative border-dashed bg-opacity-80 hover:bg-opacity-100 flex flex-col items-center justify-center max-w-1/2 min-w-60 border border-emerald-900 rounded-2xl bg-gradient-to-b from-emerald-100/50 to-emerald-200/50 text-black shadow-none hover:shadow-lg cursor-pointer trandition-all duration-200 ease-in-out"
      key={campaign?._id}
    >
      <div className="bg-white absolute right-2 top-2 border border-emerald-500 px-5 py-0.5 text-xs rounded-full flex itme-center justify-center gap-2">
        <span className="relative flex h-2 w-2 pt-[2.8px]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span>Active</span>
      </div>
      <h1 className="font-urban font-bold text-xl pt-10 pb-7 flex item-center justify-center gap-1">
        {campaign?.name}
        <ExternalLink width={15} strokeWidth={2.5} />
      </h1>
      <p className="text-sm pb-1">
        <strong className="">Start:</strong> {campaign?.startDate}
      </p>
      <p className="text-sm ">
        <strong className="">End:</strong> {campaign?.endDate}
      </p>
    </Link>
  );
}

export default CampaignCard;
