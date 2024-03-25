import LinkedInConnectButton from "@/components/social-media-linkers/linkedin-connect-btn";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="pb-2 font-urban text-4xl font-bold text-black">
            Settings
          </h1>
          <h2 className="text-sm text-sky-500">
            All your dashboard settings are availble here
          </h2>
        </div>
        <section className="flex flex-col gap-1 rounded-md border">
          <div className="p-6">
            <h3 className=" text-xl">Connected Social Accounts</h3>
            <p className="text-grey-project my-2 text-sm">
              Please connect your social accounts to allow us to post on your
              behalf.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="flex w-full items-center justify-between rounded-sm border-t border-sky-500/20 bg-sky-500/20 px-6 py-3">
                <Skeleton className="h-7 w-20 border border-blue-300 text-sm" />
                <Skeleton className="h-8 w-20 border border-blue-300 bg-sky-100" />
              </div>
            }
          >
            <LinkedInConnectButton />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
