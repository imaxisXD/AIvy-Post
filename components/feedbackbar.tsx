import { Bell, HelpCircle, MessageSquareShare } from "lucide-react";
import Link from "next/link";

function Feedbackbar() {
  return (
    <header className="h-14 border sticky z-10 top-3 bg-white flex items-center gap-2 px-3 justify-end text-sm rounded-tl-3xl">
      <button className="flex items-center justify-center gap-1.5 px-2 py-1 border rounded-lg">
        <MessageSquareShare className="h-4 w-4 text-grey-project" />
        Feedback
      </button>
      <Link
        className="flex items-center justify-center gap-1.5 px-2 py-1 border rounded-lg"
        href={"/help"}
      >
        <HelpCircle className="h-4 w-4 text-grey-project" />
        Help
      </Link>
      <button className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 border rounded-lg">
        <Bell className="h-4 w-4 " />
        {/* <BellRing /> */}
      </button>
    </header>
  );
}

export default Feedbackbar;
