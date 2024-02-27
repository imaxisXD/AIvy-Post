import CampaignForm from "./campaign-form";

function NewCampaignPage() {
  return (
    <section className="bg-[#eeeff1] mt-7 w-[80%] rounded-lg p-0.5 flex flex-col items-center justify-center">
      <div className="px-10 bg-[#fefffe] rounded-t-lg border-t border-x border-[#dedee3] w-full">
        <h1 className="font-urban font-semibold text-lg pt-10 pb-1">
          Create a new campaign
        </h1>
        <p className="text-sm text-slate-600 pb-7">
          Your campaign will have post on your behalf to your social account.
          <br /> You can manage the duration of the campaign.
        </p>
      </div>
      <CampaignForm />
    </section>
  );
}

export default NewCampaignPage;
