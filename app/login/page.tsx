"use client";
import {
  ClerkLoading,
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <ClerkProvider>
        <ClerkLoading>
          <div className="w-40 h-9" />
        </ClerkLoading>
        <SignedIn>
          <OpenDashboardLinkButton />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-4 animate-[fade-in_0.2s]">
            <SignInButton mode="modal" redirectUrl="/t">
              <button>Sign in</button>
            </SignInButton>
            <SignUpButton mode="modal" redirectUrl="/t">
              <button>Sign up</button>
            </SignUpButton>
          </div>
        </SignedOut>
      </ClerkProvider>
    </div>
  );
}
function OpenDashboardLinkButton() {
  return (
    <Link href="/dashboard" className="animate-[fade-in_0.2s]">
      <button>Dashboard</button>
    </Link>
  );
}
