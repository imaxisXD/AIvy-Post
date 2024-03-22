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
      className="max-w-1/2 bg-grid-small-black/[0.15] trandition-all relative flex h-56 min-w-60 cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#71c19a] bg-opacity-80 text-black shadow-lg shadow-emerald-500/10 duration-200 ease-in-out hover:bg-opacity-100 hover:shadow-lg"
      key={campaign?._id}
      scroll={true}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#e6f9ee] to-[#f3f6f6] [mask-image:radial-gradient(ellipse_at_center,transparent_55%,black)]"></div>
      <div className="itme-center absolute right-2 top-2 flex justify-center gap-2 rounded-full border border-emerald-500 bg-white px-5 py-0.5 text-xs">
        <span className="relative flex h-2 w-2 pt-[2.8px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        <span>Active</span>
      </div>
      <h1 className="item-center flex justify-center gap-1 pb-7 pt-10 font-urban text-xl font-bold text-black drop-shadow-sm">
        {campaign?.name}
        <ExternalLink width={15} strokeWidth={2.5} />
      </h1>
      <p className="mb-1 flex w-[70%] items-center justify-around gap-2 rounded-lg border border-green-600/50 bg-[#ffffff] px-3 py-1 text-sm text-[#499772]">
        <strong className="text-[#43956e] drop-shadow-sm">Start:</strong>{" "}
        {campaign?.startDate}
      </p>
      <p className="flex w-[70%] items-center justify-around gap-2 rounded-lg border border-red-600/50 bg-[#ffffff] px-3 py-1 text-sm text-[#499772]">
        <strong className="text-[#43956e] drop-shadow-sm">End:</strong>{" "}
        {campaign?.endDate}
      </p>
    </Link>
  );
}

export default CampaignCard;
