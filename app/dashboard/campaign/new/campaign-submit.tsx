"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function CampaignSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-36 h-[30] flex items-center justify-center px-3 mt-4 py-1.5 rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-purple-400 hover:shadow-md hover:bg-gradient-to-b hover:from-blue-500/95 hover:to-blue-600/95 transition-all duration-200 disabled:bg-gradient-to-b disabled:from-blue-400 disabled:to-blue-500 disabled:cursor-wait"
    >
      <span className="drop-shadow-md text-white text-sm">
        {pending ? <Loader2 className="animate-spin h-5" /> : "Create campaign"}
      </span>
    </button>
  );
}

export default CampaignSubmitButton;
