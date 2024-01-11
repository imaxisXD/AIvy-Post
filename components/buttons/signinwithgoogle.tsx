"use client";
import { createClient } from "@/utils/supabase/client";

export default function GoogleSignInButton(props: { nextUrl?: string }) {
  const supabase = createClient();
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/login`,
      },
    });
  };

  return <button onClick={handleLogin}>Login</button>;
}
