"use client";
import { api } from "@/convex/_generated/api";
import twitterLinkAction from "@/utils/actions/twitterLinkAction";
import Image from "next/image";
import Linkedbutton from "../buttons/linkedbutton";
import UnLinkedbutton from "../buttons/unlinkbutton";
import LinkItButton from "../buttons/linkbutton";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";

export default function TwitterLink() {
  const { user } = useUser();

  console.log(user?.primaryEmailAddress?.toString());

  // Convex fetch users data
  const userData = useQuery(api.users.getUserDetails, {
    userEmail: user?.primaryEmailAddress?.toString() || "",
  });

  const isUserLinked =
    (user &&
      userData &&
      user?.primaryEmailAddress?.toString() === userData.email) ||
    false;

  async function twitterAction() {
    twitterLinkAction();
  }

  return (
    <form action={twitterAction}>
      <button
        disabled={false}
        type="submit"
        className={`hover:bg-opacity-50 duration-150 flex justify-between items-center w-11/12 py-2 pl-5 px-4 rounded-sm  border ${
          isUserLinked
            ? "bg-green-900/20 border-green-800"
            : "bg-[#222322] border-stone-500/20"
        }`}
      >
        <div className="flex items-center justify-center gap-4 text-sm">
          <Image src="/twitter.svg" alt="twitter" height={18} width={18} />
          <span>Twitter</span>
          {isUserLinked && <Linkedbutton />}
        </div>
        {isUserLinked ? (
          <div className="flex flex-row gap-2">
            <UnLinkedbutton />
          </div>
        ) : (
          <LinkItButton />
        )}
      </button>
    </form>
  );
}
