"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function CampaignSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="mt-4 flex h-[30] w-36 items-center justify-center rounded-md bg-gradient-to-b from-purple-500 to-purple-600 px-3 py-1.5 text-white transition-all duration-300 hover:bg-gradient-to-b hover:from-purple-500/95 hover:to-purple-600/95 hover:shadow-md focus:ring-2 focus:ring-purple-200 disabled:cursor-wait disabled:bg-gradient-to-b disabled:from-purple-400/55 disabled:to-purple-500/55"
    >
      <span className="text-sm text-white drop-shadow-md">
        {pending ? <Loader2 className="h-5 animate-spin" /> : "Create campaign"}
      </span>
    </button>
  );
}

export default CampaignSubmitButton;
