import { Loader2 } from "lucide-react";
import AppLogo from "./logo";

export const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 duration-700 bg-grid-small-black/[0.25]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-theme-secondary/15 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <AppLogo className="h-32 w-32 animate-pulse transition-all duration-500 ease-linear" />
      <h1 className=" font-satoshi text-4xl font-black text-theme-primary/75 transition-all duration-300">
        LinkedInFy
      </h1>
      <span className="mt-2 h-12 w-12 animate-spin text-theme-secondary">
        <Loader2 className="h-12 w-12" />
      </span>
    </div>
  );
};
