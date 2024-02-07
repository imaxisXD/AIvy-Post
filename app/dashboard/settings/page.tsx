import LinkItButton from "@/components/buttons/linkbutton";
import LinkedInConnectButton from "@/components/social-media-linkers/linkedin-connect-btn";
import TwitterLink from "@/components/social-media-linkers/twitterLink";
import Image from "next/image";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="flex max-w-screen-xl flex-col space-y-12 p-8 min-h-screen">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="font-urban font-bold text-4xl pb-2 text-black">
            Settings
          </h1>
          <h2 className="text-sm text-sky-500">
            All your dashboard settings are availble here
          </h2>
        </div>
        <section className="border rounded-md flex flex-col gap-1">
          <div className="p-6">
            <h3 className=" text-xl">Connected Social Accounts</h3>
            <p className="text-sm my-2 text-grey-project">
              Please connect your social accounts to allow us to post on your
              behalf.
            </p>
          </div>
          <LinkedInConnectButton />
          {/* <TwitterLink /> */}
        </section>
      </div>
    </main>
  );
}
