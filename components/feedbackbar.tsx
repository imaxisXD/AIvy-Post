import { Bell, HelpCircle, MessageSquareShare } from "lucide-react";
import Link from "next/link";
import CampaignBreadCrumbs from "./campaign-bread-crums";

function Feedbackbar() {
  return (
    <header className="sticky top-1 z-10 flex h-14 items-center justify-between rounded-tl-3xl border bg-white px-3 text-sm">
      <CampaignBreadCrumbs />
      <div className="flex items-center justify-evenly gap-2">
        <button className="flex items-center justify-center gap-1.5 rounded-lg border px-2 py-1">
          <MessageSquareShare className="text-grey-project h-4 w-4" />
          Feedback
        </button>
        <Link
          className="flex items-center justify-center gap-1.5 rounded-lg border px-2 py-1"
          href={"/help"}
        >
          <HelpCircle className="text-grey-project h-4 w-4" />
          Help
        </Link>
        <button className="flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5">
          <Bell className="h-4 w-4 " />
          {/* <BellRing /> */}
        </button>
      </div>
    </header>
  );
}

export default Feedbackbar;
