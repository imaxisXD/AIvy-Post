import twitterLinkAction from "@/utils/actions/twitterLinkAction";
import { createClient } from "@/utils/supabase/server";
import { CheckCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function TwitterLink() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userdata } = await supabase
    .from("userdata")
    .select("email")
    .eq("email", user?.email!);

  async function twitterAction() {
    "use server";
    await twitterLinkAction();
  }
  return (
    <form action={twitterAction}>
      <button
        // disabled={
        //   user && userdata && user?.email === userdata[0]?.email ? true : false
        // }
        type="submit"
        className="hover:bg-opacity-50 duration-150 flex justify-between items-center w-11/12 bg-[#222322] py-2 pl-5 px-4 rounded-sm border-stone-500/20 border"
      >
        <div className="flex items-center justify-center gap-4 text-sm">
          <Image src="/twitter.svg" alt="twitter" height={18} width={18} />
          <span>Twitter</span>
        </div>
        {user && userdata && user?.email === userdata[0]?.email ? (
          <div className="border flex gap-1 items-center justify-center border-green-600 text-green-500 bg-[#051d10] rounded-md px-2 py-1 text-sm">
            <CheckCircleIcon className="h-4 w-4" />
            <span>Linked</span>
          </div>
        ) : (
          <div className="border border-stone-600 text-stone-500 rounded-md px-3 py-1 text-sm">
            Disabled
          </div>
        )}
      </button>
    </form>
  );
}
