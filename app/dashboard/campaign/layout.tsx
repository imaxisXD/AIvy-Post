import { Progress } from "@/components/ui/progress";
import { CampaignProgress } from "./CampaignProgress";

function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between border p-5 border-red-400">
      <CampaignProgress />
      {children}
    </main>
  );
}

export default CampaignLayout;
