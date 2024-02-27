import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { RedirectType, redirect } from "next/navigation";
import UnLinkedbutton from "../buttons/unlinkbutton";
import { revalidatePath } from "next/cache";
import { getAuthToken } from "@/lib/utils";

export default async function LinkedInConnectButton() {
  const token = await getAuthToken();
  const userAccessTokenExist = await fetchQuery(
    api.users.getUserToken,
    {},
    { token }
  );

  async function linkedInAction() {
    "use server";
    const redirectUrl = process.env.LINKEDIN_REDIRECT_URL;
    const oauthApi = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${process.env.STATE}&scope=profile%20email%20w_member_social`;
    redirect(oauthApi, RedirectType.push);
  }
  async function unlinkAction() {
    "use server";
    await fetchMutation(api.users.deleteUserToken, {}, { token });
    revalidatePath("/dashboard/settings");
  }

  return (
    <div className="flex justify-between items-center w-full py-3 px-6 rounded-sm border-t border-sky-500/20 bg-sky-500/20">
      <div className="flex items-center justify-center gap-2 text-sm">
        <Image src="/linkedin-icon.svg" alt="twitter" height={28} width={28} />
        <span className="text-md">LinkedIn</span>
      </div>
      {!userAccessTokenExist ? (
        <form action={linkedInAction}>
          <button className="group hover:bg-sky-500/80 rounded-md shadow-md bg-sky-500 text-white px-2 py-1.5 text-sm flex justify-between items-center gap-1 duration-150">
            <PlusCircleIcon
              height={20}
              widths={20}
              strokeWidth={1.5}
              color="white"
              fill="rgb(56 189 248 )"
              fillOpacity={50}
            />
            <span className="">Add Account</span>
          </button>
        </form>
      ) : (
        <form action={unlinkAction}>
          <UnLinkedbutton />
        </form>
      )}
    </div>
  );
}
