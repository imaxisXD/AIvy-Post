import { Loader2 } from "lucide-react";
import AppLogo from "./logo";

export const Loading = () => {
  return (
    <div className="bg-grid-small-black/[0.25] flex h-screen w-full animate-pulse flex-col items-center justify-center gap-2 duration-700">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-theme-secondary/15 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <AppLogo />
      <h1 className="font-satoshi text-4xl font-black text-theme-primary">
        LinkedInFy
      </h1>
      <span className="h-5 w-5 animate-spin text-purple-500">
        <Loader2 className="h-5 w-5" />
      </span>
    </div>
  );
};
