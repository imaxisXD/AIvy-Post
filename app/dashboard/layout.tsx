import { ReactNode, Suspense } from "react";
import Nav from "@/components/nav";
import Feedbackbar from "@/components/feedbackbar";
import ConvexClientProvider from "@/utils/ConvexClientProvider";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense>
      <ConvexClientProvider>
        <Nav />
        <div className="bg-white-project relative min-h-screen bg-stone-100 text-black sm:pl-60">
          <div className="fixed top-0 z-10 h-14 w-full bg-stone-100" />
          <Feedbackbar />
          <div className="border-l bg-[#fefffe] shadow-2xl drop-shadow-md">
            {children}
          </div>
        </div>
      </ConvexClientProvider>
    </Suspense>
  );
}
