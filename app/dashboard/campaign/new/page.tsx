import dynamic from "next/dynamic";
const CampaignForm = dynamic(() => import("./campaign-form"), {
  ssr: false,
});
function NewCampaignPage() {
  return (
    <section className="mt-7 flex w-[80%] flex-col items-center justify-center rounded-lg bg-[#eeeff1] p-0.5">
      <div className="w-full rounded-t-lg border-x border-t border-[#dedee3] bg-[#fefffe] px-10">
        <h1 className="pb-1 pt-10 font-urban text-lg font-semibold">
          Create a new campaign
        </h1>
        <p className="pb-7 text-sm text-slate-600">
          Your campaign will have post on your behalf to your social account.
          <br /> You can manage the duration of the campaign.
        </p>
      </div>
      <CampaignForm />
    </section>
  );
}

export default NewCampaignPage;
