import DeleteSVG from "@/components/icon/delete";
import { Separator } from "@/components/ui/separator";

export default function SetupPage() {
  return (
    <div className="w-[95%] rounded-lg border bg-white p-8 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-base font-medium">Campaign Details</h2>
        <div className="mt-2 flex items-center justify-center gap-2 md:mt-0">
          <button className="group flex items-center justify-center gap-2 rounded border border-red-300 bg-red-100 px-3 py-1 text-sm text-gray-600 shadow-inner transition-all duration-300 ease-in-out hover:bg-red-200 hover:text-red-700">
            <DeleteSVG className="h-4 w-4 fill-red-400 transition-all duration-300 ease-in-out group-hover:fill-red-700" />
            Delete Campaign
          </button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="pb-1 text-sm text-gray-600">Name</h3>
            <p className="text-sm">Campaign Name</p>
          </div>
          <div>
            <h3 className="pb-1 text-sm text-gray-600">Timeline</h3>
            <p className="text-sm">
              LinkeninFy &lt;linkedinFy@notification.linkedinfy.com&gt;
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="pb-1 text-sm text-gray-600">Topic</h3>
            <p className="text-sm">This is Preview Text</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Duration</h3>
            <p className="t0 text-sm">30 Days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
