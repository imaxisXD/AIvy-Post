import { Link2OffIcon } from "lucide-react";

function UnLinkedbutton() {
  return (
    <div className="border flex gap-2 items-center justify-center border-red-600 text-red-500 bg-red-900/40 rounded-md px-2 py-1 text-sm">
      <Link2OffIcon className="h-4 w-4" />
      <span>Unlink</span>
    </div>
  );
}

export default UnLinkedbutton;
