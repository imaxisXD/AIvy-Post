import TwitterLink from "@/components/social-media-linkers/twitterLink";
import {
  CheckCircleIcon,
  Linkedin,
  LucideLinkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8 bg-[#1d1d1c] min-h-screen">
      <div className="flex flex-col space-y-6">
        <div>
          <h2 className="text-2xl">Link Social Accounts</h2>
          <h3 className="text-sm pt-1 text-white/75">
            Connect Your Social Media Accounts for seamless posting integration
          </h3>
        </div>
        <div>
          <Link
            href=""
            className="hover:bg-opacity-50 flex justify-between items-center w-11/12 bg-[#222322] py-2 px-4 rounded-sm border-stone-500/20 border-x border-t"
          >
            <div className="flex items-center justify-center gap-3 text-sm">
              <Image
                src="/linkedin-icon.svg"
                alt="twitter"
                height={26}
                width={26}
              />
              <span>LinkedIn</span>
            </div>
            <div className="border border-stone-600 text-stone-500 rounded-md px-3 py-1 text-sm">
              Disabled
            </div>
          </Link>
          <TwitterLink />
        </div>
      </div>
    </div>
  );
}
