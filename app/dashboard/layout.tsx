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
        <Nav>
          <Suspense fallback={<div>Loading...</div>}></Suspense>
        </Nav>
        <div className="min-h-screen bg-white-project sm:pl-60 text-black bg-stone-100 relative">
          <div className="fixed top-0 h-14 w-full bg-stone-100 z-10" />
          <Feedbackbar />
          <div className="bg-[#fefffe]">{children}</div>
        </div>
      </ConvexClientProvider>
    </Suspense>
  );
}
