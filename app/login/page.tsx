import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { getURL } from "@/utils/geturl";
import GoogleSignInButton from "@/components/buttons/signinwithgoogle";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <GoogleSignInButton />
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
