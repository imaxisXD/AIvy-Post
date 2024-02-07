"use client";
import { SignInButton } from "@clerk/nextjs";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <SignInButton redirectUrl="/dashboard/settings" />
    </div>
  );
}
