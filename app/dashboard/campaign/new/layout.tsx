import { CampaignProgress } from "../CampaignProgress";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CampaignProgress />
      {children}
    </>
  );
}
