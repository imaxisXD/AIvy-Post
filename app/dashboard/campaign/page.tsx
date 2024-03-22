import CampaignCard from "@/components/campaign-card";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";

async function CampaignPage() {
  const token = await getAuthToken();
  const allCampaignData = await fetchQuery(
    api.campaign.getCurrentUserCampaigns,
    {},
    { token },
  );

  const activeCampaigns = allCampaignData?.filter((campaign) => {
    return campaign?.campaignIsActive === "active";
  });

  const completedCampaigns = allCampaignData?.filter((campaign) => {
    return campaign?.campaignIsActive === "completed";
  });

  const upcomingCampaigns = allCampaignData?.filter((campaign) => {
    return campaign?.campaignIsActive === "upcoming";
  });

  const previousCampaigns = allCampaignData?.filter((campaign) => {
    return campaign?.campaignIsActive === "previous";
  });

  return (
    <section className="text-stone-800">
      <h1 className="pb-1 font-urban text-2xl font-medium tracking-[0.02]">
        Campaigns
      </h1>
      <p className="pb-7 text-sm text-slate-600">
        Create, view and manage campaigns
      </p>
      <Link
        href="/dashboard/campaign/new"
        className="bg-grid-small-[#6c47ff]/[0.3] group flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-purple-600/30 text-sm transition-all duration-150 ease-in-out hover:border-purple-600/50 hover:bg-sky-300/10 "
      >
        <p className="text-slate-600">Get started by creating a new campaign</p>
        <div className="flex items-center justify-around gap-1 rounded-md border border-opacity-80 bg-[#6c47ff] px-2 py-1 text-white shadow-purple-600 drop-shadow-md transition-all duration-150 ease-in-out group-hover:bg-[#5639cb]">
          <Plus widths={18} strokeWidth={1.4} />
          <span>New Campaign</span>
        </div>
      </Link>

      {activeCampaigns && activeCampaigns.length > 0 ? (
        <section>
          <h2 className="pb-1 pt-10 font-urban text-lg font-semibold">
            Active Campaigns
          </h2>
          <p className="pb-7 text-sm text-slate-600">
            View all the ongoing campaigns
          </p>
          <div className="flex w-full flex-wrap items-start justify-evenly gap-6 pb-10">
            {activeCampaigns &&
              activeCampaigns?.length > 0 &&
              activeCampaigns.map((campaign) => (
                <CampaignCard campaign={campaign} key={campaign._id} />
              ))}
          </div>
        </section>
      ) : null}

      {upcomingCampaigns && upcomingCampaigns.length > 0 ? (
        <section>
          <h2 className="pb-1 pt-10 font-urban text-lg font-semibold">
            Upcoming Campaigns
          </h2>
          <p className="pb-7 text-sm text-slate-600">
            View all the upcoming campaigns
          </p>
          <div className="flex w-full flex-wrap items-start justify-evenly gap-6 pb-10">
            {upcomingCampaigns &&
              upcomingCampaigns?.length > 0 &&
              upcomingCampaigns.map((campaign) => (
                <CampaignCard campaign={campaign} key={campaign._id} />
              ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="pb-1 font-urban text-lg font-semibold">
          Past Campaigns
        </h2>
        <p className="pb-7 text-sm text-slate-600">
          View all the finished campaigns
        </p>
        <div className="flex w-full flex-wrap items-start justify-evenly gap-6 pb-7">
          <div className="max-w-1/2 h-56 min-w-60 rounded-2xl border"></div>
          <div className="max-w-1/2 h-56 min-w-60 rounded-2xl border"></div>
          <div className="max-w-1/2 h-56 min-w-60 rounded-2xl border"></div>
          <div className="max-w-1/2 h-56 min-w-60 rounded-2xl border"></div>
          <div className="max-w-1/2 h-56 min-w-60 rounded-2xl border"></div>
        </div>
      </section>
    </section>
  );
}

export default CampaignPage;
