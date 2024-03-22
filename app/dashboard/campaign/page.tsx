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
      <h1 className="font-urban font-medium text-2xl tracking-[0.02] pb-1">
        Campaigns
      </h1>
      <p className="text-sm text-slate-600 pb-7">
        Create, view and manage campaigns
      </p>
      <Link
        href="/dashboard/campaign/new"
        className="group hover:border-purple-600/50 hover:bg-sky-300/10 duration-150 transition-all ease-in-out cursor-pointer w-full h-40 border border-purple-600/30 border-dashed flex flex-col gap-3 items-center justify-center text-sm rounded-lg "
      >
        <p className="text-slate-600">Get started by creating a new campaign</p>
        <div className="flex gap-1 justify-around items-center border px-2 py-1 rounded-md border-opacity-80 bg-[#6c47ff] text-white drop-shadow-md shadow-purple-600 group-hover:bg-[#5639cb] duration-150 transition-all ease-in-out">
          <Plus widths={18} strokeWidth={1.4} />
          <span>New Campaign</span>
        </div>
      </Link>

      {activeCampaigns && activeCampaigns.length > 0 ? (
        <section>
          <h2 className="font-urban font-semibold text-lg pt-10 pb-1">
            Active Campaigns
          </h2>
          <p className="text-sm text-slate-600 pb-7">
            View all the ongoing campaigns
          </p>
          <div className="flex gap-6 flex-wrap items-start justify-evenly pb-10 w-full">
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
          <h2 className="font-urban font-semibold text-lg pt-10 pb-1">
            Upcoming Campaigns
          </h2>
          <p className="text-sm text-slate-600 pb-7">
            View all the upcoming campaigns
          </p>
          <div className="flex gap-6 flex-wrap items-start justify-evenly pb-10 w-full">
            {upcomingCampaigns &&
              upcomingCampaigns?.length > 0 &&
              upcomingCampaigns.map((campaign) => (
                <CampaignCard campaign={campaign} key={campaign._id} />
              ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="font-urban font-semibold text-lg pb-1">
          Past Campaigns
        </h2>
        <p className="text-sm text-slate-600 pb-7">
          View all the finished campaigns
        </p>
        <div className="flex gap-6 flex-wrap items-start justify-evenly pb-7 w-full">
          <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
          <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
          <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
          <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
          <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        </div>
      </section>
    </section>
  );
}

export default CampaignPage;
