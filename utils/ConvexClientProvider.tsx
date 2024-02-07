"use client";
import { ReactNode, useEffect } from "react";
import { Authenticated, ConvexReactClient, useMutation } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
          <h1 className="text-9xl text-white">xxxxAuth xxxxx</h1>
          <StoreUserInDatabase />
        </Authenticated>
        <h1 className="text-9xl text-white">Notttt</h1>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function StoreUserInDatabase() {
  console.log("called");

  const { user } = useUser();
  const storeUser = useMutation(api.users.store);
  useEffect(() => {
    void storeUser();
  }, [storeUser, user?.id]);
  return null;
}
