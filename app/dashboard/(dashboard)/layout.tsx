import { ReactNode, Suspense } from "react";
// import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { withProtectedRoute } from "@/utils/protectedRoute";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await withProtectedRoute("/login");

  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Profile /> */}
        </Suspense>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60">{children}</div>
    </div>
  );
}
