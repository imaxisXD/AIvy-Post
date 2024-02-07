import { ReactNode, Suspense } from "react";
import Nav from "@/components/nav";
import Feedbackbar from "@/components/feedbackbar";
import StoreUserProvider from "@/utils/StoreUserProvider";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StoreUserProvider>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <h1>ss</h1>
        </Suspense>
      </Nav>
      <div className="min-h-screen bg-white-project sm:pl-60 text-black">
        <Feedbackbar />
        {children}
      </div>
    </StoreUserProvider>
  );
}
