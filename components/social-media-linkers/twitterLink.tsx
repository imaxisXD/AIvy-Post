import twitterLinkAction from "@/utils/actions/twitterLinkAction";
import { CheckCircleIcon, Twitter } from "lucide-react";

export default function TwitterLink() {
  async function twitterAction() {
    "use server";
    await twitterLinkAction();
  }
  return (
    <form action={twitterAction}>
      <button
        type="submit"
        className="hover:bg-opacity-50 duration-150 flex justify-between items-center w-11/12 bg-[#222322] py-2 px-4 rounded-sm border-stone-500/20 border"
      >
        <div className="flex items-center justify-center gap-3 text-sm">
          <Twitter className="h-5 w-6" />
          <span>X aka Twitter</span>
        </div>
        <div className="border flex gap-1 items-center justify-center border-green-600 text-green-500 bg-[#051d10] rounded-md px-2 py-1 text-sm">
          <CheckCircleIcon className="h-4 w-4" />
          <span>Linked</span>
        </div>
      </button>
    </form>
  );
}
