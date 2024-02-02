import { Bell, HelpCircle, MessageSquareShare } from "lucide-react";
import Link from "next/link";

function Feedbackbar() {
  return (
    <nav className="h-14 border-y sticky z-1 top-0 bg-white-project flex items-center gap-2 px-3 justify-end text-sm">
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
    </nav>
  );
}

export default Feedbackbar;
