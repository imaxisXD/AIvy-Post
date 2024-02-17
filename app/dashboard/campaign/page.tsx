import { Plus } from "lucide-react";
import Link from "next/link";

function CampaignPage() {
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
      <h2 className="font-urban font-semibold text-lg pt-10 pb-1">
        Ongoing Campaigns
      </h2>
      <p className="text-sm text-slate-600 pb-7">
        View all the ongoing campaigns
      </p>
      <div className="flex gap-6 flex-wrap items-start justify-evenly pb-10 w-full">
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
      </div>

      <h2 className="font-urban font-semibold text-lg pb-1">
        Previous Campaigns
      </h2>
      <p className="text-sm text-slate-600 pb-7">
        View all the ongoing campaigns
      </p>
      <div className="flex gap-6 flex-wrap items-start justify-evenly pb-7 w-full">
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
        <div className="h-56 max-w-1/2 min-w-60 border rounded-2xl"></div>
      </div>
    </section>
  );
}

export default CampaignPage;
